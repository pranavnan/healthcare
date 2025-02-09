import { IConversationHistory } from '../../interface/user/conversation-history.interface';
import { ConversationHistoryService } from '../../services/conversation-history.service';
import { RAGService } from '../../services/rag.service';
import { container } from '../container';
import { TYPES } from '../types';

container.bind(TYPES.Automation.RAGService).to(RAGService);
container
  .bind<IConversationHistory>(TYPES.Automation.ConversationHistoryService)
  .to(ConversationHistoryService);
