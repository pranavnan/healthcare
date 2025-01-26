import { CreateIndexDto } from '../dtos/create-index-dto';
import { IIndexService } from '../interfaces/index/index.service.interface';
import { IIndexRepository } from '../interfaces/index/index.repository.interface';
import { TYPES } from '../inversify/types';
import { Index } from '../entities/index.entities';
import { IIndexTypeRepository } from '../interfaces/index/index-type.repository.interface';
import { inject } from 'inversify';

export class IndexService implements IIndexService {
  constructor(
    @inject(TYPES.IndexRepository) private indexRepo: IIndexRepository,
    @inject(TYPES.IndexTypeRepository)
    private indexTypeRepo: IIndexTypeRepository
  ) {}

  async createIndex(dto: CreateIndexDto): Promise<Index> {
    const { dimension, indexName, indexTypeId, metric } = dto;
    // make an db entry and then crete an pinecone index

    const indexType = await this.indexTypeRepo.getIndexType(indexTypeId);

    const createdIndex = await this.indexRepo.createIndex(
      indexName,
      metric,
      dimension,
      indexType
    );

    return createdIndex;
  }
}
