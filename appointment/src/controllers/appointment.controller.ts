import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entities';
import { AppointmentService } from '../services/appointment-srv';
import { Request, Response } from 'express';
import { filterFields } from '@phntickets/booking';
import { CreateAppointmentDTO } from '../dto/create-appointment';

const allowedFieldsForAppointment = [
  'usernumber',
  'status',
  'appointmentDate',
  'slot',
];

export class AppointmentController {
  private readonly appointmentService: AppointmentService;

  constructor(repo: Repository<Appointment>) {
    this.appointmentService = new AppointmentService(repo);
  }

  async createAppointment(req: Request, res: Response) {
    const dto = req.body;

    const filterField = filterFields(
      dto,
      allowedFieldsForAppointment
    ) as CreateAppointmentDTO;
    const appointment = await this.appointmentService.createAppointment(
      filterField
    );
    res.status(201).json(appointment);
  }
}
