import { OpenAIService } from '@phntickets/booking';

const openAIClient = OpenAIService.getInstance();

openAIClient.initialize(process.env.OPENAI_API_KEY!);

export { openAIClient };
