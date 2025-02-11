import { Repository } from 'typeorm';
import { Slot } from '../entities/slot.entities';
import { CreateSlotDTO } from '../dtos/create-slot-dto';
import { AppDataSource } from '../data-source';
import { DoctorLocation } from '../entities/doctor-location.entities';
import { BadRequestError, kafkaWrapper } from '@phntickets/booking';
import { filterField } from '../utils/filter-fields';
import { SlotCreatedPublisher } from '../events/publishers/slotCreatedPublisher';
import { inject } from 'inversify';
import { TYPES } from '../inversify/types';

export class SlotService {
  constructor(
    @inject(TYPES.TypeORMSlotRepository) private slotRepo: Repository<Slot>,
    @inject(TYPES.TypeORMDocLocRepository)
    private docLocRepo: Repository<DoctorLocation>
  ) {}

  async createSlot(dto: CreateSlotDTO, allowedFields: string[]) {
    const doctorLocationId = dto.doctorLocation;
    const startTime = dto.start_time;
    const endTime = dto.end_time;
    const dayOfWeek = dto.day_of_week;

    // [10:00:00,10:15:00] [10:10, 10:20]
    const checkedData = await this.docLocRepo
      .createQueryBuilder()
      .select([
        'docloc.id AS docLocId',
        's.id AS slotId',
        's.end_time AS end_time',
        's.start_time AS start_time',
      ])
      .from(DoctorLocation, 'docloc')
      .leftJoin(
        Slot,
        's',
        `
        s.start_time < :endTime
        AND s.end_time > :startTime 
        AND s.day_of_week = :dayOfWeek 
        AND s.doctorLocationId = :doctorLocationId
        `,
        {
          endTime,
          startTime,
          dayOfWeek,
          doctorLocationId,
        }
      )
      .where('docloc.id = :doctorLocationId', { doctorLocationId })
      .getRawOne();

    console.log(checkedData);
    if (!checkedData || !checkedData.docLocId)
      throw new BadRequestError('Doctor location id is not valid');
    if (checkedData.slotId)
      throw new BadRequestError(
        `Overlapping slot found startTime: ${checkedData.start_time} endTime: ${checkedData.end_time}`
      );

    const slot = new Slot();
    const filterSlotFields = filterField(dto, allowedFields) as CreateSlotDTO;
    Object.assign(slot, filterSlotFields);
    slot.is_available = true;

    const savedSlot = await this.slotRepo.save(slot);

    // emit an event to appointment
    await new SlotCreatedPublisher(kafkaWrapper).publish({
      id: savedSlot.id,
      day_of_week: dto.day_of_week,
      doctorLocation: dto.doctorLocation,
      end_time: dto.end_time,
      is_available: true,
      start_time: dto.start_time,
    });

    return savedSlot;
  }
}
