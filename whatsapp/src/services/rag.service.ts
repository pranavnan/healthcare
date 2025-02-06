import { inject } from 'inversify';
import {
  TYPES as CommonTYPES,
  IAIChatCompletionService,
  IOpenAIEmbeddingService,
  IPineconeService,
} from '@phntickets/booking';
import {
  OPENAI_COMPLETION_MODEL,
  OPENAI_EMBEDDING_MODEL,
  SYSTEM_PROMPT,
} from '../utils/openai';
import { PINECONE_INDEX } from '../utils/pinecone';
import { QueryResponse, RecordMetadata } from '@pinecone-database/pinecone';
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources';
import { availableFunction } from '../functions';
import { redisClient } from './redis.service';
import { InteractionHistoryType } from '../types/interaction-history/interaction-history.types';

export class RAGService {
  constructor(
    @inject(CommonTYPES.OpenAIEmbeddingClient)
    private openAIEmbeddingService: IOpenAIEmbeddingService,
    @inject(CommonTYPES.PineconeService)
    private pineconeClient: IPineconeService,
    @inject(CommonTYPES.AIChatCompletionService)
    private aiChatCompletionService: IAIChatCompletionService
  ) {}

  async getRAGResponse(userQuery: string, userNumber: string) {
    // console.time('RAGService.getRAGResponse');

    console.time('RAGService.getRAGResponse.getEmbeddings');
    const embeddings = await this.getEmbeddings(userQuery);
    console.timeEnd('RAGService.getRAGResponse.getEmbeddings');

    if (!embeddings) {
      throw new Error('Could not generate embeddings');
    }

    console.time('RAGService.getRAGResponse.getDocuments');
    const docs = await this.getDocuments(embeddings);
    console.timeEnd('RAGService.getRAGResponse.getDocuments');

    if (!docs) {
      throw new Error('Could not get documents');
    }
    const userHistory = await this.getUserInteractionHistory(userNumber);

    const systemPrompt = this.generateSystemPrompt(
      userQuery,
      userHistory,
      docs
    );
    const retrievedDocuments = this.getFormattedDocuments(docs);

    // const history = (await this.getUserInteractionHistory(userNumber)).map(ele => ({ role: 'assistant', content: `Past Retrieval Documents: {${ele.retrieval.map((ele, i) => `--- Document ${i + 1} ---\n` + + `Source: ${ele}\n`).join('\n'))}}` }));

    const history = userHistory.reduce((acc, curr) => {
      acc.push({
        role: 'user',
        content: curr.userQuery,
      });
      acc.push({
        role: 'assistant',
        content: curr.botResponse,
      });
      return acc;
    }, [] as ChatCompletionMessageParam[]);
    // const history = userHistory.map((ele) => {
    //   return {
    //     role: ele.tool_calls ? 'assistant' : 'user',
    //     content: `Past Retrieval Documents: {${ele.retrieval
    //       .map((retrievDoc, i) => {
    //         console.log({ retrievDoc });
    //         return `--- Document ${i + 1} ---\n` + `Source: ${retrievDoc}\n`;
    //       })
    //       .join('\n')}} Past BotResponse: {${
    //       ele.botResponse
    //     }} Past UserQuery:{ ${ele.userQuery}}`,
    //     tool_calls: ele.tool_calls,
    //   };
    // }) as ChatCompletionMessageParam[];

    console.log({ systemPrompt, retrievedDocuments, history });

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        // role: 'developer',
        content: systemPrompt,
      },
      ...history,
      {
        role: 'user',
        // content: `Reference these documents:\n${retrievedDocuments}\n\nQuestion: ${userQuery}`,
        content: userQuery,
      },
    ];

    const functionTools = this.getFunctionTools();

    console.time('RAGService.getRAGResponse');
    const response = await this.aiChatCompletionService.completion(
      messages,
      OPENAI_COMPLETION_MODEL,
      functionTools
    );
    console.timeEnd('RAGService.getRAGResponse');
    console.dir({ response }, { depth: null });
    const responseText = response?.choices[0].message.content;
    const functionCall = response?.choices[0].message.tool_calls;

    const retrievalDocs = docs.matches.map(
      (doc) => doc.metadata?.text as string
    );
    await this.setUserInteractionHistory(userNumber, {
      userQuery,
      botResponse: responseText || '',
      retrieval: retrievalDocs,
      tool_calls: functionCall,
    });
    // console.timeEnd('RAGService.getRAGResponse');
  }

  private async setUserInteractionHistory(
    userNumber: string,
    userInteractions: InteractionHistoryType
  ) {
    const sessionKey = `session:${userNumber}`;

    const existingData = await this.getUserInteractionHistory(userNumber);

    existingData.push(userInteractions);

    console.log({ existingData });

    redisClient.HSET(
      sessionKey,
      'userInteractions',
      JSON.stringify(existingData)
    );
  }

  private async getUserInteractionHistory(userNumber: string) {
    const sessionKey = `session:${userNumber}`;
    const existingData = await redisClient.HGET(sessionKey, 'userInteractions');

    if (existingData) {
      return JSON.parse(existingData) as InteractionHistoryType[];
    }
    return [];
  }

  private getFunctionTools(): ChatCompletionTool[] {
    return Object.values(availableFunction).map((value) => ({
      type: 'function',
      function: {
        name: value.name,
        description: value.description,
        parameters: value.parameters,
        strict: value.strict,
      },
    }));
  }

  private getFormattedDocuments(docs: QueryResponse<RecordMetadata>) {
    return docs.matches
      .map(
        (doc, i) =>
          `--- Document ${i + 1} ---\n` +
          `${doc.metadata!.name}\n` +
          `Source: ${doc.metadata!.text}\n`
      )
      .join('\n');
  }

  private generateSystemPrompt(
    userQuery: string,
    userHistory: InteractionHistoryType[],
    docs: QueryResponse<RecordMetadata>
  ): string {
    let systemPrompt = SYSTEM_PROMPT.replace('@user_query', userQuery);
    systemPrompt = systemPrompt.replace(
      '@current_date_time',
      new Date().toISOString()
    );
    const retrievalDocs = new Set(),
      userQueryArr: string[] = [],
      botResponse: string[] = [];
    docs.matches.forEach((doc, i) => {
      systemPrompt = systemPrompt.replace(
        `@doc_${i + 1}`,
        doc.metadata!.text as string
      );
      // retrievalDocs.add(doc.metadata!.text);
    });
    userHistory.forEach((ele) => {
      userQueryArr.push(`Past UserQuery: ${ele.userQuery}`);
      botResponse.push(`Past BotResponse: ${ele.botResponse}`);
      ele.retrieval.forEach((retrievalDoc) => {
        retrievalDocs.add(retrievalDoc);
      });
    });

    systemPrompt = systemPrompt.replace(
      '@past_retrieval_documents',
      JSON.stringify(Array.from(retrievalDocs).join('\n\n'))
    );
    // systemPrompt = systemPrompt.replace(
    //   '@past_user_queries',
    //   userQueryArr.join('\n') as string
    // );
    // systemPrompt = systemPrompt.replace(
    //   '@past_bot_responses',
    //   botResponse.join('\n')
    // );
    return systemPrompt;
  }

  private async getDocuments(
    embeddings: number[]
  ): Promise<QueryResponse<RecordMetadata>> {
    const docs = await this.pineconeClient.documenQuery(
      PINECONE_INDEX,
      3,
      embeddings,
      false,
      true
    );
    return docs;
  }

  private async getEmbeddings(text: string) {
    const embeddings = await this.openAIEmbeddingService.generateEmbedding(
      text,
      OPENAI_EMBEDDING_MODEL
    );

    return embeddings;
  }
}
