import { CreateIndexDto } from '../../dtos/create-index-dto';
import { Index } from '../../entities/index.entities';

export interface IIndexService {
  createIndex(dto: CreateIndexDto): Promise<Index>;
}
