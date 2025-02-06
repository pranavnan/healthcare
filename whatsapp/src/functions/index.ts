import { IFunction } from '../interface/openai/function.interface';
import { bookAppointmentIncomplete } from './book-appointment.function';

export const availableFunction: Record<string, IFunction> = {
  bookAppointmentIncomplete,
};
