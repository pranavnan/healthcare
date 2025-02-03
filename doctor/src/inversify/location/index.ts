import { TYPES as CommonTYPES } from '@phntickets/booking';
import { container } from '../container';
import { LocationService } from '../../services/location.service';
import { TYPES } from '../types';
import { DataSource, Repository } from 'typeorm';
import { Location } from '../../entities/location.entities';

container.bind<LocationService>(TYPES.LocationService).to(LocationService);
container
  .bind<Repository<Location>>(TYPES.TypeORMLocationRepository)
  .toDynamicValue((context) => {
    const dataSource = context.container.get<DataSource>(
      CommonTYPES.DataSource
    );
    return dataSource.getRepository(Location);
  });
