import { IFunction } from '../interface/openai/function.interface';
import { container } from '../inversify/container';
import { TYPES } from '../inversify/types';

export function getAvailableFunctions(): Record<string, IFunction> {
  return {
    handle_appointment_for_doctor_and_location: container.get<IFunction>(
      TYPES.Appointments.HandleAppointmentForDoctorAndLocation
    ),
  };
}

// export const availableFunction: Record<string, IFunction> = {
//   handle_appointment_for_doctor_and_location: container.get<IFunction>(
//     TYPES.Appointments.HandleAppointmentForDoctorAndLocation
//   ),
// };
