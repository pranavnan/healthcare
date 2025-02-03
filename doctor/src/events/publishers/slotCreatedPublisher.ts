import { Publisher, SlotCreatedEvent, Topics } from '@phntickets/booking';

export class SlotCreatedPublisher extends Publisher<SlotCreatedEvent> {
  topic: Topics.SlotCreated = Topics.SlotCreated;
}
