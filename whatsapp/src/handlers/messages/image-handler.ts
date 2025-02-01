import { WhatsAppMessage } from '../../types/webhooks/whatsapp-message.types';
import { BaseMessageHandler } from './base-message-handler';

export class ImageHandler extends BaseMessageHandler {
  protected canHandleMessage(payload: WhatsAppMessage): boolean {
    return payload[0].type === 'image';
  }

  protected async processMessagePayload(
    payload: WhatsAppMessage
  ): Promise<void> {
    console.log('Image message received:', payload);
  }
}
