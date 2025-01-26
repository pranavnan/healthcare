import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';

import { NotFoundError } from '@phntickets/booking';
import { IndexDocumentType } from '../entities/index-document-type.entities';
import { inject } from 'inversify';

export class IndexDocumentTypeRepository {
  constructor(
    @inject(TYPES.TypeORMIndexDocumentTypeRepository)
    private indexDocTypeRepo: Repository<IndexDocumentType>
  ) {}

  async getDocumentTypeById(id: number): Promise<IndexDocumentType> {
    const indexDocType = await this.indexDocTypeRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!indexDocType) {
      throw new NotFoundError('Index Document Type not found');
    }

    return indexDocType;
  }
}
