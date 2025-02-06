import { OpenAIEmbeddingService } from '@phntickets/booking';

const openAIEmbeddingClient = OpenAIEmbeddingService.getInstance();
openAIEmbeddingClient.initialize(process.env.OPENAI_API_KEY!);
export { openAIEmbeddingClient };
