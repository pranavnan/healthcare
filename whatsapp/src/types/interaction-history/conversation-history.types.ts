import { ChatCompletionMessageToolCall } from 'openai/resources';

export type ConversationHistoryType = {
  userQuery: string;
  botResponse: string;
  retrieval: string[];
  tool_calls?: ChatCompletionMessageToolCall[];
};
