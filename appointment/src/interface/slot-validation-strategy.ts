import { AppointmentChecked } from '../dto/appointment-checked-data';
import { CreateAppointmentDTO } from '../dto/create-appointment';

/*
 To handle the scenario where the slot parameter can be either a `slotId` or a `start_time` in a way that adheres to SOLID principles, you can use the Strategy Pattern. This pattern allows you to define a family of algorithms, encapsulate each one, and make them interchangeable.

Here's how you can implement it:

1. Define an interface for the slot validation strategy.
2. Create concrete strategies for validating by slotId and start_time.
3. Use a context class to select and execute the appropriate strategy.
 */
export interface SlotValidationStrategy {
  validateSlot(dto: CreateAppointmentDTO): Promise<AppointmentChecked>;
}
