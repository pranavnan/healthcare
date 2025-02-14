import { HandleAppointmentForDocLocFunction } from '../../functions/book-appointment';
import { IFunction } from '../../interface/openai/function.interface';
import { container } from '../container';
import { TYPES } from '../types';

container
  .bind<IFunction>(TYPES.Appointments.HandleAppointmentForDoctorAndLocation)
  .to(HandleAppointmentForDocLocFunction);
