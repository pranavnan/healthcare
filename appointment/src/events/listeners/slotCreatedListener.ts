import {
  filterFields,
  Listener,
  SlotCreatedEvent,
  Topics,
} from '@phntickets/booking';

import { EachMessagePayload } from 'kafkajs';
import { AppDataSource } from '../../data-source';
import { Slot } from '../../entities/slot.entities';

const slotAllowedFields = [
  'is_available',
  'day_of_week',
  'end_time',
  'start_time',
  'doctorLocation',
  'id',
];

export class SlotCreatedListener extends Listener<SlotCreatedEvent> {
  topic: Topics.SlotCreated = Topics.SlotCreated;
  groupId: string = 'slot-created';
  async onMessage(
    data: SlotCreatedEvent['data'],
    payload: EachMessagePayload
  ): Promise<void> {
    try {
      console.log(`data received from topic ${this.topic}`, data);

      const { partition, topic, message: msg } = payload;

      const slotRepo = AppDataSource.getRepository(Slot);

      const filterField = filterFields(data, slotAllowedFields);

      const slot = new Slot();

      Object.assign(slot, filterField);

      await slotRepo.save(slot);

      await this._consumer?.commitOffsets([
        {
          topic,
          partition,
          offset: (BigInt(msg.offset) + BigInt(1)).toString(),
        },
      ]);
    } catch (err) {
      console.log(
        `Error occured while receiving topic: ${this.topic} with data:`,
        data
      );
    }
  }
}
