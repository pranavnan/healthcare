import { inject } from 'inversify';
import {
  TYPES as CommonTYPES,
  IAIChatCompletionService,
  IOpenAIEmbeddingService,
} from '@phntickets/booking';
import {
  OPENAI_COMPLETION_MODEL,
  OPENAI_EMBEDDING_MODEL,
} from '../utils/openai';
import {
  PINECONE_INDEX,
  PINECONE_INDEX_TOP_K,
  PINECONE_INCLUDE_METADATA,
  PINECONE_INCLUDE_VALUES,
} from '../utils/pinecone';
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources';

import { TYPES } from '../inversify/types';
import { IDocumentRetrieverService } from '../interface/pinecone/document-retrieval.interface';
import { SystemPromptGenerator } from '../utils/helper-classes/system-prompt-generator';
import { IConversationHistory } from '../interface/user/conversation-history.interface';
import { ConversationHistoryType } from '../types/interaction-history/conversation-history.types';
import { QueryResponse, RecordMetadata } from '@pinecone-database/pinecone';
import { getAvailableFunctions } from '../functions';
import { IFunction } from '../interface/openai/function.interface';

export class RAGService {
  constructor(
    @inject(CommonTYPES.OpenAIEmbeddingClient)
    private openAIEmbeddingService: IOpenAIEmbeddingService,
    @inject(TYPES.Pinecone.DocumentRetrieverService)
    private docsRetrieverService: IDocumentRetrieverService,
    @inject(CommonTYPES.AIChatCompletionService)
    private aiChatCompletionService: IAIChatCompletionService,
    @inject(TYPES.Automation.ConversationHistoryService)
    private conversationHistoryService: IConversationHistory
  ) {}

  async getRAGResponse(
    userQuery: string,
    userNumber: string,
    passedDocument: boolean = true
  ): Promise<string> {
    try {
      const userConversationHistory =
        await this.conversationHistoryService.getUserConversationHistory(
          userNumber
        );

      let docs: QueryResponse<RecordMetadata> = { matches: [], namespace: '' };

      if (passedDocument) {
        console.time('RAGService.getRAGResponse.getEmbeddings');
        const embeddings = await this.getEmbeddings(userQuery);
        console.timeEnd('RAGService.getRAGResponse.getEmbeddings');
        if (!embeddings) {
          throw new Error('Could not generate embeddings');
        }
        console.time('RAGService.getRAGResponse.getDocuments');
        docs = await this.docsRetrieverService.getDocuments(
          PINECONE_INDEX,
          PINECONE_INDEX_TOP_K,
          embeddings,
          PINECONE_INCLUDE_METADATA,
          PINECONE_INCLUDE_VALUES
        );
        console.timeEnd('RAGService.getRAGResponse.getDocuments');

        if (!docs) {
          throw new Error('Could not get documents');
        }
      }

      // Updated to use the helper class
      const systemPrompt = SystemPromptGenerator.generate(
        userQuery,
        userConversationHistory,
        docs
      );
      // const retrievedDocuments =
      //   this.docsRetrieverService.getFormattedDocuments(docs);

      const history = this.buildHistory(userConversationHistory);
      console.log(systemPrompt, '\n\n', systemPrompt);
      // console.dir({ history }, { depth: null });

      const messages: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...history,
        {
          role: 'user',
          content: userQuery,
        },
      ];

      const availableFunction = getAvailableFunctions();

      const functionTools = this.getFunctionTools(availableFunction);

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

      const currentConversation = {
        userQuery,
        botResponse: responseText || '',
        retrieval: retrievalDocs,
        tool_calls: functionCall,
      };

      await this.conversationHistoryService.saveUserConversationHistory(
        userNumber,
        userConversationHistory,
        currentConversation
      );

      if (functionCall) {
        const options = {
          userNumber,
        };
        for (const toolCall of functionCall) {
          // toolCall.function.arguments = JSON.parse(toolCall.function.arguments);
          await availableFunction[functionCall[0].function.name].execute(
            toolCall.function.arguments,
            options
          );
        }
      }

      return responseText || '';
    } catch (error) {
      console.error('Error in RAGService.getRAGResponse', error);
      return '';
    }
  }

  private buildHistory(userConversationHistory: ConversationHistoryType[]) {
    return userConversationHistory.reduce((acc, curr) => {
      acc.push({
        role: 'user',
        content: curr.userQuery,
      });
      acc.push({
        role: 'assistant',
        ...(curr.botResponse ? { content: curr.botResponse } : {}),
        ...(curr.tool_calls ? { tool_calls: curr.tool_calls } : {}),
      });
      if (curr.tool_calls) {
        for (const toolHistory of curr.tool_calls) {
          acc.push({
            role: 'tool',
            tool_call_id: toolHistory.id,
            content: toolHistory.function.arguments,
          });
        }
      }
      return acc;
    }, [] as ChatCompletionMessageParam[]);
  }

  private getFunctionTools(
    availableFunction: Record<string, IFunction>
  ): ChatCompletionTool[] {
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

  private async getEmbeddings(text: string) {
    const embeddings = await this.openAIEmbeddingService.generateEmbedding(
      text,
      OPENAI_EMBEDDING_MODEL
    );

    return embeddings;
  }
}
