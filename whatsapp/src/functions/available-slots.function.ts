import { IFunction } from '../interface/openai/function.interface';

export const availableSlotsForDoctorAndLocation: IFunction = {
  name: 'available_slots_for_doctor_and_location',
  description: `This function is triggered ONLY when ALL required parameters are explicitly provided by the user. If location details are missing, DO NOT assume values - instead ask the user to specify the exact location. Collect: doctor's location name, appointment date, and optional time slot.`,
  strict: true,
  parameters: {
    type: 'object',
    properties: {
      doctorLocationId: {
        type: 'number',
        description: `MUST BE CONFIRMED WITH USER. The unique identifier of the explicitly specified doctor's location. DO NOT ASSUME OR GUESS VALUES. If uncertain, return null and ask user to choose from available locations.`,
      },
      appointmentDate: {
        type: 'string',
        description: `CONFIRM WITH USER. Valid future date in YYYY-MM-DD format. If unclear, ask for clarification.`,
      },
      // slotTime: {
      //   type: 'string',
      //   description: `OPTIONAL. Preferred time in HH:MM format. Only include if specified by user.`,
      // },
    },
    required: ['doctorLocationId', 'appointmentDate'],
    additionalProperties: false,
  },
  execute: async (params: any) => {
    console.log('Executing book_appointment function with:', params);
    // Actual booking logic
  },
};
