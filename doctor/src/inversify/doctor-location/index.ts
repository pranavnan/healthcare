import { DataSource, Repository } from 'typeorm';
import { DoctorLocationService } from '../../services/doctor-location.service';
import { container } from '../container';
import { TYPES } from '../types';
import { TYPES as CommonTYPES } from '@phntickets/booking';
import { DoctorLocation } from '../../entities/doctor-location.entities';

container
  .bind<DoctorLocationService>(TYPES.DocLocService)
  .to(DoctorLocationService);
container
  .bind<Repository<DoctorLocation>>(TYPES.TypeORMDocLocRepository)
  .toDynamicValue((context) => {
    const dataSource = context.container.get<DataSource>(
      CommonTYPES.DataSource
    );
    return dataSource.getRepository(DoctorLocation);
  });
