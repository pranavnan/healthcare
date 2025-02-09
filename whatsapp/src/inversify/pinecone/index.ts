import { IPineconeService, TYPES as CommonTYPES } from '@phntickets/booking';
import { container } from '../container';
import { pineconeClient } from '../../services/pinecone.service';
import { IDocumentRetrieverService } from '../../interface/pinecone/document-retrieval.interface';
import { DocumentRetrieverService } from '../../services/document-retriever.service';
import { TYPES } from '../types';

container
  .bind<IPineconeService>(CommonTYPES.PineconeService)
  .toConstantValue(pineconeClient);

container
  .bind<IDocumentRetrieverService>(TYPES.Pinecone.DocumentRetrieverService)
  .to(DocumentRetrieverService);
