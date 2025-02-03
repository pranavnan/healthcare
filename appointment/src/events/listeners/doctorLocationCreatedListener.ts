import {
  DoctorLocationCreatedEvent,
  Topics,
  Listener,
  filterFields,
} from '@phntickets/booking';
import { EachMessagePayload } from 'kafkajs';
import { AppDataSource } from '../../data-source';
import { DoctorLocation } from '../../entities/doctor-location.entities';

export const doctorLocationAllowedFields = [
  'doctorId',
  'locationId',
  'is_active',
  'id',
  'doctorName',
  'locationName',
];

export class DoctorLocationCreatedListener extends Listener<DoctorLocationCreatedEvent> {
  topic: Topics.DoctorLocationCreated = Topics.DoctorLocationCreated;

  groupId: string = 'doctor-location-created';

  async onMessage(
    data: DoctorLocationCreatedEvent['data'],
    message: EachMessagePayload
  ): Promise<void> {
    try {
      console.log(`data received from topic ${this.topic}`, data);

      const { partition, topic, message: msg, heartbeat } = message;

      const docLocRepo = AppDataSource.getRepository(DoctorLocation);
      const filterField = filterFields(data, doctorLocationAllowedFields);
      const docLoc = new DoctorLocation();

      Object.assign(docLoc, filterField);

      await docLocRepo.save(docLoc);

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
