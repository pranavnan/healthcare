/* eslint-disable @typescript-eslint/no-unused-vars */
import { IFunction } from '../interface/openai/function.interface';

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
    // execute function deliberately left unimplemented as per requirements
  },
};
