import { DataSource, Repository } from 'typeorm';
import { IndexDocumentRepository } from '../../repository/index-document.repository';
import { IndexDocumentService } from '../../services/index-document.service';
import { container } from '../container';
import { TYPES } from '../types';
import { TYPES as CommonTYPES } from '@phntickets/booking';
import { IndexDocument } from '../../entities/index-document.entities';

container
  .bind<IndexDocumentService>(TYPES.IndexDocumentService)
  .to(IndexDocumentService);

container
  .bind<IndexDocumentRepository>(TYPES.IndexDocumentRepository)
  .to(IndexDocumentRepository);

container
  .bind<Repository<IndexDocument>>(TYPES.TypeORMIndexDocumentRepository)
  .toDynamicValue((context) => {
    const dataStource = context.container.get<DataSource>(
      CommonTYPES.DataSource
    );
    return dataStource.getRepository(IndexDocument);
  });
