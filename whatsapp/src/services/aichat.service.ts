import { AIChatCompletionService } from '@phntickets/booking';

const aiChatCompletionClient = AIChatCompletionService.getInstance();
// openai
// aiChatCompletionClient.initialize(process.env.OPENAI_API_KEY!);

// deepseek
aiChatCompletionClient.initialize(
  process.env.DEEPSEEK_API_KEY!,
  'https://api.deepseek.com'
);

export { aiChatCompletionClient };
