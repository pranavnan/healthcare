import { IndexModel } from '@pinecone-database/pinecone';
import { PineconeMetric } from '../../enums/pinecone-metric';

export interface IPineconeRepository {
  createIndex(
    indexName: string,
    dimension: number,
    metrics: PineconeMetric
  ): Promise<void>;
  disableDeletionProtection(indexName: string): Promise<IndexModel>;
}
