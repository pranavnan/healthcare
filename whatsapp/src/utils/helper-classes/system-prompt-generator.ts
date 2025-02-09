import { QueryResponse, RecordMetadata } from '@pinecone-database/pinecone';
import { ConversationHistoryType } from '../../types/interaction-history/conversation-history.types';
import { SYSTEM_PROMPT } from '../openai';

export class SystemPromptGenerator {
  static generate(
    userQuery: string,
    userHistory: ConversationHistoryType[],
    docs: QueryResponse<RecordMetadata>
  ): string {
    let systemPrompt = SYSTEM_PROMPT.replace('@user_query', userQuery);
    systemPrompt = systemPrompt.replace(
      '@current_date_time',
      new Date().toISOString()
    );
    const retrievalDocs = new Set<string>();
    docs.matches.forEach((doc, i) => {
      systemPrompt = systemPrompt.replace(
        `@doc_${i + 1}`,
        doc.metadata!.text as string
      );
    });
    userHistory.forEach((entry) => {
      entry.retrieval.forEach((retrievalDoc) => {
        retrievalDocs.add(retrievalDoc);
      });
    });
    systemPrompt = systemPrompt.replace(
      '@past_retrieval_documents',
      JSON.stringify(Array.from(retrievalDocs).join('\n\n'))
    );
    return systemPrompt;
  }
}
