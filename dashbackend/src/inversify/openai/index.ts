import { IOpenAIService } from '@phntickets/booking';
import { openAIClient } from '../../services/openai.service';
import { container } from '../container';
import { TYPES } from '../types';

container
  .bind<IOpenAIService>(TYPES.OpenAIClient)
  .toConstantValue(openAIClient);
