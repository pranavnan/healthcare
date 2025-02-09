import { IConversationHistory } from '../interface/user/conversation-history.interface';
import { ConversationHistoryType } from '../types/interaction-history/conversation-history.types';
import { redisClient } from './redis.service';

export class ConversationHistoryService implements IConversationHistory {
  async getUserConversationHistory(
    userNumber: string
  ): Promise<ConversationHistoryType[] | []> {
    const sessionKey = `session:${userNumber}`;
    const existingData = await redisClient.HGET(
      sessionKey,
      'userConversations'
    );

    if (existingData) {
      return JSON.parse(existingData) as ConversationHistoryType[];
    }
    return [];
  }

  async saveUserConversationHistory(
    userNumber: string,
    pastConversation: ConversationHistoryType[],
    newConversation: ConversationHistoryType
  ): Promise<void> {
    const sessionKey = `session:${userNumber}`;

    pastConversation.push(newConversation);

    console.log({ pastConversation });

    await redisClient.HSET(
      sessionKey,
      'userConversations',
      JSON.stringify(pastConversation)
    );
  }
}
