import {
  AppointmentCreatedEvent,
  Publisher,
  Topics,
} from '@phntickets/booking';

export class AppointmentCreatedPublisher extends Publisher<AppointmentCreatedEvent> {
  topic: Topics.AppointmentCreated = Topics.AppointmentCreated;
}
