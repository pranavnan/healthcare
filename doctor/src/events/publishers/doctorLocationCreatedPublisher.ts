import {
  DoctorLocationCreatedEvent,
  Publisher,
  Topics,
} from '@phntickets/booking';

export class DoctorLocationCreatedPublisher extends Publisher<DoctorLocationCreatedEvent> {
  topic: Topics.DoctorLocationCreated = Topics.DoctorLocationCreated;
}
