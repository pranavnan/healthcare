import { IOpenAIService, TYPES as CommonTYPES } from '@phntickets/booking';
import { openAIClient } from '../../services/openai.service';
import { container } from '../container';

container
  .bind<IOpenAIService>(CommonTYPES.OpenAIClient)
  .toConstantValue(openAIClient);
