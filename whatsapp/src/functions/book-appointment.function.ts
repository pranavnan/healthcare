import { IFunction } from '../interface/openai/function.interface';
/*
export const bookAppointmentIncomplete: IFunction = {
  name: 'book_appointment_without_slot',
  description: `This function is triggered ONLY when ALL required parameters are explicitly provided by the user. 
                DO NOT ASSUME OR GUESS VALUES for doctorLocationId. If the user has not explicitly specified a location, 
                DO NOT CALL THIS FUNCTION. Instead, ask the user to provide the exact location name or choose from available options. 
                Required parameters: doctorLocationId (must be explicitly confirmed by the user), appointmentDate (must be a valid future date). 
                Optional parameter: slotTime (only include if explicitly provided by the user).`,
  strict: true,
  parameters: {
    type: 'object',
    properties: {
      doctorLocationId: {
        type: 'number',
        description: `MUST BE EXPLICITLY CONFIRMED BY THE USER. The unique identifier of the doctor's location. 
                      DO NOT ASSUME OR GUESS VALUES. If the user has not explicitly specified a location, 
                      return null and ask the user to choose from available locations.`,
      },
      appointmentDate: {
        type: 'string',
        description: `MUST BE CONFIRMED BY THE USER. The exact date of the appointment in YYYY-MM-DD format. 
                      Ensure the date is valid and not in the past. If unclear, ask the user for clarification.`,
      },
      slotTime: {
        type: 'string',
        description: `OPTIONAL. The preferred time slot for the appointment in HH:MM format (24-hour clock). 
                      Only include if explicitly provided by the user. If not provided, leave this field empty.`,
      },
    },
    required: ['doctorLocationId', 'appointmentDate'],
    additionalProperties: false,
  },
  execute: async (params) => {
    console.log('Executing book_appointment function with:', params);
    // Add validation logic here
  },
};
*/

export const bookAppointmentIncomplete: IFunction = {
  name: 'book_appointment_without_slot',
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

// export const bookAppointmentIncomplete: IFunction = {
//   name: 'book_appointment_without_slot',
//   description: `This function is triggered when a user provides details about booking a doctor and location for appointment. It ensures that the required details—doctor's location, appointment date are correctly captured. The function only activates when the user asks about appointment-related topics and ignores unrelated queries.`,
//   strict: true,
//   parameters: {
//     type: 'object',
//     properties: {
//       doctorLocationId: {
//         type: 'number',
//         description: `The unique identifier of the doctor's location where the appointment is to be booked. This must be selected based on the user's chosen location to avoid incorrect matches.`,
//       },
//       appointmentDate: {
//         type: 'string',
//         description: `The exact date of the appointment in YYYY-MM-DD format. Ensure the date is valid and not in the past.`,
//       },
//       slotTime: {
//         type: 'string',
//         description:
//           'The preferred time slot for the appointment in HH:MM format (24-hour clock). Ensure that the slot is available before confirming the booking.',
//       },
//     },
//     required: ['doctorLocationId', 'appointmentDate' /*'slotTime'*/],
//     additionalProperties: false,
//   },
//   execute: async () => {
//     console.log('Executing book_appointment function');
//   },
// };
