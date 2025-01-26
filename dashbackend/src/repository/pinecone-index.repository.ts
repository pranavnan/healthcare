import { TYPES } from '../inversify/types';
import { IndexModel, Pinecone } from '@pinecone-database/pinecone';
import { PineconeMetric } from '../enums/pinecone-metric';
import { IPineconeRepository } from '../interfaces/pinecone-index/pinecone-index.repository.interface';
import { BadRequestError } from '@phntickets/booking';
import { inject } from 'inversify';

export class PineconeIndexRepository implements IPineconeRepository {
  constructor(
    @inject(TYPES.PineconeClient) private pineconeRepository: Pinecone
  ) {}

  async disableDeletionProtection(indexName: string): Promise<IndexModel> {
    return await this.pineconeRepository.configureIndex(indexName, {
      deletionProtection: 'disabled',
    });
  }

  async createIndex(
    indexName: string,
    dimension: number,
    metrics: PineconeMetric
  ): Promise<void> {
    try {
      console.log('Creating index');
      const indexInfo = await this.pineconeRepository.createIndex({
        waitUntilReady: true,
        dimension: dimension,
        name: indexName,
        metric: metrics,
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1',
          },
        },
      });
      console.log('Created index');

      if (!indexInfo) {
        throw new Error('Failed to create index');
      }
      // return indexInfo;
    } catch (err) {
      console.log({ err });
      // @ts-expect-error tslint:disable-next-line: no-unsafe-any
      throw new BadRequestError(err?.message);
    }
    // return IndexModel
  }
}
