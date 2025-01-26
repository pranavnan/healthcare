import { IndexType } from '../entities/index-type.entities';
import { Index } from '../entities/index.entities';
import { IIndexRepository } from '../interfaces/index/index.repository.interface';
import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';
import { PineconeMetric } from '../enums/pinecone-metric';
import { IPineconeRepository } from '../interfaces/pinecone-index/pinecone-index.repository.interface';
import { inject } from 'inversify';

export class IndexRepository implements IIndexRepository {
  constructor(
    @inject(TYPES.TypeORMIndexRepository) private indexRepo: Repository<Index>,
    @inject(TYPES.PineconeRepository) private pineconeRepo: IPineconeRepository
  ) {}

  async createIndex(
    indexName: string,
    metric: string,
    dimension: number,
    indexType: IndexType
  ): Promise<Index> {
    return await this.indexRepo.manager.transaction(
      async (transactionalEntityManager) => {
        const index = new Index();
        index.index_name = indexName;
        index.metrics = metric as PineconeMetric;
        index.dimension = dimension;
        index.indexType = indexType;

        // i want to do some task after this

        await this.pineconeRepo.createIndex(
          indexName,
          dimension,
          metric as PineconeMetric
        );

        return await transactionalEntityManager.save(index);
      }
    );
  }
}
