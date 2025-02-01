import { WhatsAppMessage } from '../../types/webhooks/whatsapp-message.types';
import { BaseMessageHandler } from './base-message-handler';

export class TextHandler extends BaseMessageHandler {
  protected canHandleMessage(payload: WhatsAppMessage): boolean {
    return payload[0].type === 'text';
  }

  protected async processMessagePayload(
    payload: WhatsAppMessage
  ): Promise<void> {
    console.log('Text message received:', payload);
  }
}
