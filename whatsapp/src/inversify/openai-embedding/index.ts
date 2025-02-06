import {
  TYPES as CommonTYPES,
  IOpenAIEmbeddingService,
} from '@phntickets/booking';
import { container } from '../container';
import { openAIEmbeddingClient } from '../../services/openai-embedding.service';

container
  .bind<IOpenAIEmbeddingService>(CommonTYPES.OpenAIEmbeddingClient)
  .toConstantValue(openAIEmbeddingClient);
