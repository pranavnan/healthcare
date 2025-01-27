import { TYPES } from '../inversify/types';
import { IndexDocumentRepository } from '../repository/index-document.repository';
import { CreateIndexDocumentDTO } from '../dtos/create-document-dto';
import { IndexDocumentTypeRepository } from '../repository/index-document-type.repository';
import { inject } from 'inversify';
import { IIndexRepository } from '../interfaces/index/index.repository.interface';

export class IndexDocumentService {
  constructor(
    @inject(TYPES.IndexDocumentRepository)
    private indexDocumentRepo: IndexDocumentRepository,
    @inject(TYPES.IndexDocumentTypeRepository)
    private indexDocTypeRepo: IndexDocumentTypeRepository,
    @inject(TYPES.IndexRepository) private indexRepo: IIndexRepository
  ) {}

  async createIndexDocument(dto: CreateIndexDocumentDTO) {
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
}
