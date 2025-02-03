import { TYPES as CommonTYPES } from '@phntickets/booking';
import { container } from '../container';
import { SlotService } from '../../services/slot.service';
import { TYPES } from '../types';
import { DataSource, Repository } from 'typeorm';
import { Slot } from '../../entities/slot.entities';

// Bind SlotService
container.bind<SlotService>(TYPES.SlotService).to(SlotService);

// Bind Slot Repository
container
  .bind<Repository<Slot>>(TYPES.TypeORMSlotRepository)
  .toDynamicValue((context) => {
    const dataSource = context.container.get<DataSource>(
      CommonTYPES.DataSource
    );
    return dataSource.getRepository(Slot);
  });
