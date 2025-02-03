import { Request, Response } from 'express';
import { CreateSlotDTO } from '../dtos/create-slot-dto';
import { inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { SlotService } from '../services/slot.service';
import { controller, httpPost } from 'inversify-express-utils';

export const allowedSlotFields = [
  'day_of_week',
  'is_available',
  'end_time',
  'start_time',
  'doctorLocation',
];

@controller('/api/slots')
export class SlotController {
  constructor(@inject(TYPES.SlotService) private slotService: SlotService) {}

  @httpPost('/')
  async createSlot(req: Request, res: Response) {
    const dto = req.body as CreateSlotDTO;
    const createdSlot = await this.slotService.createSlot(
      dto,
      allowedSlotFields
    );
    res.status(201).json(createdSlot);
  }
}
