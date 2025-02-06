import { PineconeService } from '@phntickets/booking';

const pineconeClient = PineconeService.getInstance();
pineconeClient.initialize(process.env.PINECONE_API_KEY!);

export { pineconeClient };
