import { Pinecone } from '@pinecone-database/pinecone';
import { IPineconeRepository } from '../../interfaces/pinecone-index/pinecone-index.repository.interface';
import { PineconeIndexRepository } from '../../repository/pinecone-index.repository';
import { container } from '../container';
import { TYPES } from '../types';
import { pineConeClient } from '../../services/pinecone.service';

container
  .bind<IPineconeRepository>(TYPES.PineconeRepository)
  .to(PineconeIndexRepository);

container.bind<Pinecone>(TYPES.PineconeClient).toConstantValue(pineConeClient);
