import { TYPES } from '../inversify/types';
import { IndexDocumentRepository } from '../repository/index-document.repository';
import { CreateIndexDocumentDTO } from '../dtos/create-document-dto';
import { IndexDocumentTypeRepository } from '../repository/index-document-type.repository';
import { inject } from 'inversify';

export class IndexDocumentService {
  constructor(
    @inject(TYPES.IndexDocumentRepository)
    private indexDocumentRepo: IndexDocumentRepository,
    @inject(TYPES.IndexDocumentTypeRepository)
    private indexDocTypeRepo: IndexDocumentTypeRepository
  ) {}

  async createIndexDocument(dto: CreateIndexDocumentDTO) {
    const { doctorLocationId, documentTypeId, indexName, status, text } = dto;

    const indexDocType = await this.indexDocTypeRepo.getDocumentTypeById(
      documentTypeId
    );

    return await this.indexDocumentRepo.createIndexDocument(
      doctorLocationId,
      indexName,
      status,
      text,
      indexDocType
    );
  }
}
