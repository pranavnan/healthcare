import { DataSource, Repository } from 'typeorm';
import { IIndexRepository } from '../../interfaces/index/index.repository.interface';
import { IIndexService } from '../../interfaces/index/index.service.interface';
import { IndexRepository } from '../../repository/index.repository';
import { IndexService } from '../../services/index.service';
import { container } from '../container';
import { TYPES } from '../types';
import { Index } from '../../entities/index.entities';
import { TYPES as CommonTYPES } from '@phntickets/booking';

container.bind<IIndexService>(TYPES.IndexService).to(IndexService);

container.bind<IIndexRepository>(TYPES.IndexRepository).to(IndexRepository);

container
  .bind<Repository<Index>>(TYPES.TypeORMIndexRepository)
  .toDynamicValue((context) => {
    const dataSource = context.container.get<DataSource>(
      CommonTYPES.DataSource
    );
    return dataSource.getRepository(Index);
  });
