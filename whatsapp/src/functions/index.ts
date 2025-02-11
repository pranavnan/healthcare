import { IFunction } from '../interface/openai/function.interface';
import { handleAppointmentForDoctorAndLocation } from './general-booking';

export const availableFunction: Record<string, IFunction> = {
  handleAppointmentForDoctorAndLocation,
};
