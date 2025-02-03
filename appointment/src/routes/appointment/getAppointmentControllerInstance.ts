import { AppointmentController } from '../../controllers/appointment.controller';
import { AppDataSource } from '../../data-source';
import { Appointment } from '../../entities/appointment.entities';

export const appointmentController = new AppointmentController(
  AppDataSource.getRepository(Appointment)
);
