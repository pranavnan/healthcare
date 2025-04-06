/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from 'inversify';
import { IFunction } from '../interface/openai/function.interface';
import { HandleAppointmentForDoctorAndLocation } from '../types/functions/general-booking';
import { TYPES } from '../inversify/types';
import { AxiosInstance } from 'axios';
import { RAGService } from '../services/rag.service';
import { IWhatsappMessageSendService } from '../interface/whatsapp/message-send.interface';
import { LogUtil } from '../utils/log-util';

export class HandleAppointmentForDocLocFunction implements IFunction {
  public name = 'handle_appointment_for_doctor_and_location';
  public description = `This function handles doctor appointment requests. It requires the doctor's location identifier and an appointment date in YYYY-MM-DD format. If a slotTime (in HH:MM format, 24-hour clock) is provided, it books the appointment. Otherwise, it returns the available slots for that doctor and date.`;
  public strict = false;
  public parameters = {
    type: 'object',
    properties: {
      doctorLocationId: {
        type: 'number',
        description: `The unique identifier for the doctor's location. Must be a positive number explicitly confirmed by the user.`,
      },
      appointmentDate: {
        type: 'string',
        description: `The appointment date in YYYY-MM-DD format. The date must be in the future and within the next 6 days from today (current date + 6 days).`,
      },
      slotTime: {
        type: 'string',
        description: `Optional. The time slot for the appointment in HH:MM format (24-hour clock). If provided, the appointment is booked.`,
      },
    },
    required: ['doctorLocationId', 'appointmentDate'],
    additionalProperties: false,
  };

  constructor(
    @inject(TYPES.Automation.RAGService) private ragService: RAGService,
    @inject(TYPES.MessageSend.MessageSendService)
    private messageSendService: IWhatsappMessageSendService,
    @inject(TYPES.Axios.AppointmentAxiosInstance) private appointmentAxiosInstance: AxiosInstance
  ) {}

  async execute(params: any, options: any): Promise<any> {
    const parsedParams = JSON.parse(
      params
    ) as HandleAppointmentForDoctorAndLocation;
    const { appointmentDate, doctorLocationId, slotTime } = parsedParams;

    const data = await this.appointmentAxiosInstance.get(
      `/slot?doctorLocationId=${doctorLocationId}&date=${appointmentDate}`
    );
    const { userNumber } = options;

    // console.log(data.data);
    LogUtil.logObject(data.data, `Function: ${this.constructor.name}`);

    const message = await this.ragService.getRAGResponse(
      `Here is the data: ${JSON.stringify(data.data)} if data is empty, prompt the user to pick a different date or time`,
      userNumber,
      false
    );

    if (message) {
      await this.messageSendService.sendTextMessage(
        userNumber,
        message,
        false
      );
    }
  }
}