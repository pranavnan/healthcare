import { Repository } from 'typeorm';
import { SlotService } from '../services/slot.srv';
import { Slot } from '../entities/slot.entities';
import { Appointment } from '../entities/appointment.entities';
import { Request, Response } from 'express';

export class SlotController {
  private readonly slotService: SlotService;
  constructor(
    slotRepo: Repository<Slot>,
    appointmentRepo: Repository<Appointment>
  ) {
    this.slotService = new SlotService(slotRepo, appointmentRepo);
  }

  async getAvailableSlotsByDate(req: Request, res: Response) {
    const { date, doctorLocationId } = req.query;
    const data = await this.slotService.getAvailableSlotsByDate(
      date as string,
      Number(doctorLocationId)
    );
    res.send(data);
  }
}
