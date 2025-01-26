import { IndexType } from '../entities/index-type.entities';
import { IIndexTypeRepository } from '../interfaces/index/index-type.repository.interface';
import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';
import { NotFoundError } from '@phntickets/booking';
import { inject } from 'inversify';

export class IndexTypeRepository implements IIndexTypeRepository {
  constructor(
    @inject(TYPES.TypeORMIndexTypeRepository)
    private indexTypeRepo: Repository<IndexType>
  ) {}

  async getIndexType(indexTypeId: number): Promise<IndexType> {
    const indexType = await this.indexTypeRepo.findOne({
      where: {
        id: indexTypeId,
      },
    });

    if (!indexType) {
      throw new NotFoundError(`Index type with id ${indexTypeId} not found`);
    }

    return indexType;
  }
}
