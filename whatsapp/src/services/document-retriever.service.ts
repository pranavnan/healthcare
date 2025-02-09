import { inject } from 'inversify';
import { TYPES as CommonTYPES, IPineconeService } from '@phntickets/booking';
import { QueryResponse, RecordMetadata } from '@pinecone-database/pinecone';
import { IDocumentRetrieverService } from '../interface/pinecone/document-retrieval.interface';

export class DocumentRetrieverService implements IDocumentRetrieverService {
  constructor(
    @inject(CommonTYPES.PineconeService)
    private pineConeClient: IPineconeService
  ) {}

  async getDocuments(
    indexName: string,
    topK: number,
    embeddings: number[],
    includeMetadata: boolean,
    includeValues: boolean
  ): Promise<QueryResponse<RecordMetadata>> {
    const response = await this.pineConeClient.documenQuery(
      indexName,
      topK,
      embeddings,
      includeValues,
      includeMetadata
    );
    return response;
  }

  getFormattedDocuments(docs: QueryResponse<RecordMetadata>) {
    return docs.matches
      .map(
        (doc, i) =>
          `--- Document ${i + 1} ---\n` +
          `${doc.metadata!.name}\n` +
          `Source: ${doc.metadata!.text}\n`
      )
      .join('\n');
  }
}
