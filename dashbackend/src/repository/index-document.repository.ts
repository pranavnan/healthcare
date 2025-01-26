import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';

import { DocumentStatus } from '../enums/document-status';
import { IndexDocument } from '../entities/index-document.entities';
import { IndexDocumentType } from '../entities/index-document-type.entities';
import { inject } from 'inversify';

export class IndexDocumentRepository {
  constructor(
    @inject(TYPES.TypeORMIndexDocumentRepository)
    private indexDocRepo: Repository<IndexDocument>
  ) {}

  async createIndexDocument(
    doctorLocationId: number,
    indexName: string,
    status: DocumentStatus,
    text: string,
    indexDocType: IndexDocumentType
  ) {
    return await this.indexDocRepo.manager.transaction(
      async (transactionEntityManager) => {
        const indexDoc = new IndexDocument();

        indexDoc.index_document_type = indexDocType;
        indexDoc.name = indexName;
        indexDoc.status = DocumentStatus[status];

        return await transactionEntityManager.save(indexDoc);
      }
    );
  }
}
