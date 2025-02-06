import { inject } from 'inversify';
import {
  TextMessage,
  WhatsAppMessage,
} from '../../types/webhooks/whatsapp-message.types';
import { BaseMessageHandler } from './base-message-handler';
import { RAGService } from '../../services/rag.service';
import { TYPES } from '../../inversify/types';

export class TextHandler extends BaseMessageHandler {
  constructor(
    @inject(TYPES.Automation.RAGService) private ragService: RAGService
  ) {
    super();
  }
  protected canHandleMessage(
    payload: WhatsAppMessage
  ): payload is [TextMessage, ...any[]] {
    return payload[0].type === 'text';
  }

  protected async processMessagePayload(
    payload: [TextMessage, ...any[]]
  ): Promise<void> {
    console.log('Text message received:', payload);
    this.ragService.getRAGResponse(payload[0]?.text?.body, payload[0]?.from);
  }
}
