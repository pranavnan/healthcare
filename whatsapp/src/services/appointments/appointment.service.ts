import { inject } from 'inversify';
import { IAppointmentService } from '../../interface/appointment/appointment-service.interface';
import { TYPES } from '../../inversify/types';
import { IAppointmentRepository } from '../../interface/appointment/appointment-repository.interface';

export class AppointmentService implements IAppointmentService {
  constructor(
    @inject(TYPES.Appointments.AppointmentRepository)
    private appointmentRepository: IAppointmentRepository
  ) {}

  async checkAvailableSlotsForProvidedDate(
    doctorLocationId: number,
    appointmentDate: string
  ): Promise<any> {
    console.log({
      checkAvailableSlots_params: { doctorLocationId, appointmentDate },
    });
  }

  async bookAppointment(
    doctorLocationId: number,
    appointmentDate: string,
    slotTime: string
  ): Promise<any> {
    console.log({
      bookAppointment_params: { doctorLocationId, appointmentDate, slotTime },
    });
  }
}
