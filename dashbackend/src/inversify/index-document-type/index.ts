import { DataSource } from 'typeorm';
import { IndexDocumentTypeRepository } from '../../repository/index-document-type.repository';
import { container } from '../container';
import { TYPES } from '../types';
import { TYPES as CommonTYPES } from '@phntickets/booking';
import { IndexDocumentType } from '../../entities/index-document-type.entities';

container
  .bind<IndexDocumentTypeRepository>(TYPES.IndexDocumentTypeRepository)
  .to(IndexDocumentTypeRepository);

container
  .bind(TYPES.TypeORMIndexDocumentTypeRepository)
  .toDynamicValue((context) => {
    const dataSource = context.container.get<DataSource>(
      CommonTYPES.DataSource
    );

    return dataSource.getRepository(IndexDocumentType);
  });
