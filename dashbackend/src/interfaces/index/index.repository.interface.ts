import { IndexType } from '../../entities/index-type.entities';
import { Index } from '../../entities/index.entities';

export interface IIndexRepository {
  createIndex(
    indexName: string,
    metric: string,
    dimension: number,
    indexType: IndexType
  ): Promise<Index>;
  getIndex(indexId: number): Promise<Index>;
}
