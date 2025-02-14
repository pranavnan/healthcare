/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from 'inversify';
import { IFunction } from '../interface/openai/function.interface';
import { HandleAppointmentForDoctorAndLocation } from '../types/functions/general-booking';
import { IAppointmentService } from '../interface/appointment/appointment-service.interface';
import { TYPES } from '../inversify/types';
import axios from 'axios';
import { RAGService } from '../services/rag.service';
import { IWhatsappMessageSendService } from '../interface/whatsapp/message-send.interface';

export class HandleAppointmentForDocLocFunction implements IFunction {
  public name = 'handle_appointment_for_doctor_and_location';
  public description = `This function handles doctor appointment requests. It requires the doctor's location identifier and an appointment date in YYYY-MM-DD format.
If a slotTime (in HH:MM format, 24-hour clock) is provided, it books the appointment.
Otherwise, it returns the available slots for that doctor and date.`;
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
    private messageSendService: IWhatsappMessageSendService
  ) {}

  async execute(params: any, options: any): Promise<any> {
    const parsedParams = JSON.parse(
      params
    ) as HandleAppointmentForDoctorAndLocation;
    const { appointmentDate, doctorLocationId, slotTime } = parsedParams;

    const data = await axios.get(
      `http://appointment-srv:3000/api/appointment/slot?doctorLocationId=${doctorLocationId}&date=${appointmentDate}`
    );
    const { userNumber } = options;

    console.log(data.data);

    if (data.data.length) {
      const message = await this.ragService.getRAGResponse(
        JSON.stringify(data.data),
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

    // if (slotTime) {
    //   // Book the appointment if the slot is provided and available.
    //   return this.appointmentService.bookAppointment(
    //     doctorLocationId,
    //     appointmentDate,
    //     slotTime
    //   );
    // } else {
    //   // Return available slots for the doctor on the given date.
    //   const slots = await this.appointmentService.checkAvailableSlots(
    //     doctorLocationId,
    //     appointmentDate
    //   );
    //   return {
    //     status: 'success',
    //     message: `Available slots for location ${doctorLocationId} on ${appointmentDate}`,
    //     slots,
    //   };
    // }
  }
}

/*
export const handleAppointmentForDoctorAndLocation: IFunction = {
  name: 'handle_appointment_for_doctor_and_location',
  description: `This function handles doctor appointment requests. It requires the doctor's location identifier and an appointment date in YYYY-MM-DD format.
If a slotTime (in HH:MM format, 24-hour clock) and dayOfWeek are provided, it books the appointment.
Otherwise, it returns the available slots for that doctor and date.`,
  strict: false,
  parameters: {
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
        description: `Optional. The time slot for the appointment in HH:MM format (24-hour clock). If provided along with dayOfWeek, the appointment is booked.`,
        // nullable: true,
      },
    },
    required: ['doctorLocationId', 'appointmentDate'],
    additionalProperties: false,
  },
  execute: async (params: any): Promise<any> => {
    const parsedParams = JSON.parse(
      params
    ) as HandleAppointmentForDoctorAndLocation;

    const { appointmentDate, doctorLocationId, slotTime } = parsedParams;
    if (slotTime) {
      // book the appointment if the slit is available and return;
    }
    // execute function deliberately left unimplemented as per requirements
  },
};
*/
