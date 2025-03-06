import { IAppointmentRepository } from '../../interface/appointment/appointment-repository.interface';
import { IAppointmentService } from '../../interface/appointment/appointment-service.interface';
import { AppointmentRepository } from '../../repositories/appointment.repository';
import { AppointmentService } from '../../services/appointments/appointment.service';
import { container } from '../container';
import { TYPES } from '../types';

container
  .bind<IAppointmentRepository>(TYPES.Appointments.AppointmentRepository)
  .to(AppointmentRepository);

container
  .bind<IAppointmentService>(TYPES.Appointments.AppointmentService)
  .to(AppointmentService);
