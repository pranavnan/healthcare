import {
  TYPES as CommonTYPES,
  IAIChatCompletionService,
} from '@phntickets/booking';
import { container } from '../container';
import { aiChatCompletionClient } from '../../services/aichat.service';

container
  .bind<IAIChatCompletionService>(CommonTYPES.AIChatCompletionService)
  .toConstantValue(aiChatCompletionClient);
