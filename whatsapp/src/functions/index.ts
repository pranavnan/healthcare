import { IFunction } from '../interface/openai/function.interface';
import { availableSlotsForDoctorAndLocation } from './available-slots.function';

export const availableFunction: Record<string, IFunction> = {
  availableSlotsForDoctorAndLocation,
};
