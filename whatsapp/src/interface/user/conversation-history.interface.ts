import { ConversationHistoryType } from '../../types/interaction-history/conversation-history.types';

export interface IConversationHistory {
  getUserConversationHistory(
    userNumber: string
  ): Promise<ConversationHistoryType[] | []>;

  saveUserConversationHistory(
    userNumber: string,
    pastConversation: ConversationHistoryType[],
    newConversation: ConversationHistoryType
  ): Promise<void>;
}
