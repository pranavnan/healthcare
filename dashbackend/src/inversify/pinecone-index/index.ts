import { container } from '../container';
import { TYPES } from '../types';
import { IPineconeService } from '@phntickets/booking';
import { pineconeClient } from '../../services/pinecone.service';

container
  .bind<IPineconeService>(TYPES.PineconeService)
  .toConstantValue(pineconeClient);
