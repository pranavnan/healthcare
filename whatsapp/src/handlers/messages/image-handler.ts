import { WhatsAppMessage } from '../../types/webhooks/whatsapp-message.types';
import { BaseHandler } from '../base-webhook-handler';

export class ImageHandler extends BaseHandler<WhatsAppMessage> {
  protected canHandle(payload: WhatsAppMessage): boolean {
    return payload[0].type === 'image';
  }

  protected async processPayload(
    payload: WhatsAppMessage
  ): Promise<void> {
    console.log('Image message received:', payload);
  }
}
