import { OpenAIService } from '@phntickets/booking';

const openAIClient = OpenAIService.getInstance();
// console.log(process.env.OPENAI_API_KEY);
openAIClient.initialize(process.env.OPENAI_API_KEY!);

export { openAIClient };
