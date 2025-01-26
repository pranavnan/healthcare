import { Pinecone } from '@pinecone-database/pinecone';

const pineConeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
  maxRetries: 5,
});

export { pineConeClient };
