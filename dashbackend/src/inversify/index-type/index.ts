import { DataSource, Repository } from 'typeorm';
import { IIndexTypeRepository } from '../../interfaces/index/index-type.repository.interface';
import { IndexTypeRepository } from '../../repository/index-type.repository';
import { container } from '../container';
import { TYPES } from '../types';
import { IndexType } from '../../entities/index-type.entities';
import { TYPES as CommonTYPES } from '@phntickets/booking';

container
  .bind<IIndexTypeRepository>(TYPES.IndexTypeRepository)
  .to(IndexTypeRepository);

container
  .bind<Repository<IndexType>>(TYPES.TypeORMIndexTypeRepository)
  .toDynamicValue((context) => {
    const dataSource = context.container.get<DataSource>(
      CommonTYPES.DataSource
    );
    return dataSource.getRepository(IndexType);
  });
