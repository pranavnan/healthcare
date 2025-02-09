import { QueryResponse, RecordMetadata } from '@pinecone-database/pinecone';

export interface IDocumentRetrieverService {
  getDocuments(
    indexName: string,
    topK: number,
    embeddings: number[],
    includeMetadata: boolean,
    includeValues: boolean
  ): Promise<QueryResponse<RecordMetadata>>;

  getFormattedDocuments(docs: QueryResponse<RecordMetadata>): string;
}
