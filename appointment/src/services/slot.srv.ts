import { Repository } from 'typeorm';
import { Slot } from '../entities/slot.entities';
import { Appointment } from '../entities/appointment.entities';

export class SlotService {
  private readonly slotRepo: Repository<Slot>;
  private readonly appointmentRepo: Repository<Appointment>;
  constructor(
    repo: Repository<Slot>,
    appointmentRepo: Repository<Appointment>
  ) {
    this.slotRepo = repo;
    this.appointmentRepo = appointmentRepo;
  }

  async getAvailableSlotsByDate(date: string, doctorLocationId: number) {
    const appointmentDate = new Date(date);
    const dayOfWeek = appointmentDate.getDay();
    const slots = await this.slotRepo
      .createQueryBuilder('slot')
      // Left join with appointment filtering by the specified appointmentDate
      .leftJoin(
        'slot.appointment',
        'appointment',
        'appointment.appointmentDate = :appointmentDate AND appointment.status != :status',
        { appointmentDate, status: 'cancelled' }
      )
      .where('slot.doctorLocation = :doctorLocationId', { doctorLocationId })
      .andWhere('slot.is_available = true')
      .andWhere('slot.day_of_week = :dayOfWeek', { dayOfWeek })
      // Exclude slots that already have an appointment on the given date
      .andWhere('appointment.id IS NULL')
      .getMany();

    return slots;
  }
}
