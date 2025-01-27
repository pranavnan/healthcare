import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';

import { DocumentStatus } from '../enums/document-status';
import { IndexDocument } from '../entities/index-document.entities';
import { IndexDocumentType } from '../entities/index-document-type.entities';
import { inject } from 'inversify';
import { Index } from '../entities/index.entities';
import {
  BadRequestError,
  IOpenAIService,
  IPineconeService,
} from '@phntickets/booking';

export class IndexDocumentRepository {
  constructor(
    @inject(TYPES.TypeORMIndexDocumentRepository)
    private indexDocRepo: Repository<IndexDocument>,
    @inject(TYPES.OpenAIClient) private openAiService: IOpenAIService,
    @inject(TYPES.PineconeService) private pineconeService: IPineconeService
  ) {}

  async createIndexDocument(
    doctorLocationId: number,
    documentName: string,
    status: DocumentStatus,
    text: string,
    indexDocType: IndexDocumentType,
    index: Index
  ) {
    return await this.indexDocRepo.manager.transaction(
      async (transactionEntityManager) => {
        const indexDoc = new IndexDocument();

        indexDoc.index_document_type = indexDocType;
        indexDoc.name = documentName;
        indexDoc.status = DocumentStatus[status];
        indexDoc.index = index;

        // get openaiEmbedding
        const embeddings = await this.openAiService.generateEmbedding(
          text,
          // 'text-embedding-3-small',
          'text-embedding-3-large',
          index.dimension
        );

        if (!embeddings)
          throw new BadRequestError('Openai Embedding not generated');

        const document = await transactionEntityManager.save(indexDoc);

        // set it to the pinecone index
        await this.pineconeService.documentUpsert(
          index.index_name,
          embeddings,
          {
            status,
            index: index.id,
            doctorLocationId,
            updated_at: Math.floor(Date.now() / 1000),
            created_at: Math.floor(Date.now() / 1000),
            documentTypeId: indexDocType.id,
            documentTypeLabel: indexDocType.name,
            keywords: [],
            category: '',
            version: 1,
            language: 'en',
            tags: [],
          },
          `${index.index_name}:${document.id}`
        );

        return document;
      }
    );
  }
}
