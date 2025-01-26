import { IndexType } from '../../entities/index-type.entities';

export interface IIndexTypeRepository {
  getIndexType(indexTypeId: number): Promise<IndexType>;
}
