import { TYPES } from '../inversify/types';
import { IndexDocumentRepository } from '../repository/index-document.repository';
import { CreateIndexDocumentDTO } from '../dtos/create-document-dto';
import { IndexDocumentTypeRepository } from '../repository/index-document-type.repository';
import { inject } from 'inversify';
import { IIndexRepository } from '../interfaces/index/index.repository.interface';
import { GetDocumentDTO } from '../dtos/get-document-dto';
import { IndexDocument } from '../entities/index-document.entities';
import { QueryResponse, RecordMetadata } from '@pinecone-database/pinecone';

export class IndexDocumentService {
  constructor(
    @inject(TYPES.IndexDocumentRepository)
    private indexDocumentRepo: IndexDocumentRepository,
    @inject(TYPES.IndexDocumentTypeRepository)
    private indexDocTypeRepo: IndexDocumentTypeRepository,
    @inject(TYPES.IndexRepository) private indexRepo: IIndexRepository
  ) {}

  async createIndexDocument(
    dto: CreateIndexDocumentDTO
  ): Promise<IndexDocument> {
    const {
      doctorLocationId,
      documentTypeId,
      documentName,
      status,
      text,
      indexId,
    } = dto;

    const indexDocType = await this.indexDocTypeRepo.getDocumentTypeById(
      documentTypeId
    );

    const index = await this.indexRepo.getIndex(indexId);

    return await this.indexDocumentRepo.createIndexDocument(
      doctorLocationId,
      documentName,
      status,
      text,
      indexDocType,
      index
    );
  }

  async getIndexDocuments(
    dto: GetDocumentDTO
  ): Promise<QueryResponse<RecordMetadata>> {
    const { indexId, text } = dto;

    const indexData = await this.indexRepo.getIndex(indexId);

    const { dimension, index_name } = indexData;

    return await this.indexDocumentRepo.getIndexDocument(
      text,
      index_name,
      dimension
    );
  }
}
