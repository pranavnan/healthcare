import { container } from '../container';
import { IPineconeService, TYPES as CommonTYPES } from '@phntickets/booking';
import { pineconeClient } from '../../services/pinecone.service';

container
  .bind<IPineconeService>(CommonTYPES.PineconeService)
  .toConstantValue(pineconeClient);
