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
  TYPES as CommonTYPES,
} from '@phntickets/booking';
import { QueryResponse, RecordMetadata } from '@pinecone-database/pinecone';

// const embeddingModel = 'text-embedding-3-large';
const embeddingModel = 'text-embedding-3-small';

export class IndexDocumentRepository {
  constructor(
    @inject(TYPES.TypeORMIndexDocumentRepository)
    private indexDocRepo: Repository<IndexDocument>,
    @inject(CommonTYPES.OpenAIClient) private openAiService: IOpenAIService,
    @inject(CommonTYPES.PineconeService)
    private pineconeService: IPineconeService
  ) {}

  private async getOpenaiEmbedding(
    text: string,
    dimension?: number
  ): Promise<number[]> {
    const embeddings = await this.openAiService.generateEmbedding(
      text,
      embeddingModel,
      dimension
    );
    if (!embeddings)
      throw new BadRequestError('Openai Embedding not generated');
    return embeddings;
  }

  async getIndexDocument(
    text: string,
    indexName: string,
    dimension: number
  ): Promise<QueryResponse<RecordMetadata>> {
    console.time('openai');
    const embedding = await this.getOpenaiEmbedding(text, dimension);
    console.timeEnd('openai');

    const includeMetadata = true;
    const includeValues = false;
    const topK = 1;

    console.time('retrieval');
    const documents = await this.pineconeService.documenQuery(
      indexName,
      topK,
      embedding,
      includeValues,
      includeMetadata
    );
    console.timeEnd('retrieval');

    return documents;
  }

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
        const embeddings = await this.getOpenaiEmbedding(text, index.dimension);

        const document = await transactionEntityManager.save(indexDoc);

        // set it to the pinecone index
        await this.pineconeService.documentUpsert(
          index.index_name,
          embeddings,
          {
            text,
            name: documentName,
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
