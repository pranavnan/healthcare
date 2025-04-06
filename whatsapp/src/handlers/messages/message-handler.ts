import { BaseHandler } from '../base-webhook-handler';
import { WhatsAppWebhookPayload } from '../../types/webhooks/whatsapp-webhook.types';
import { TYPES } from '../../inversify/types';
import { inject } from 'inversify';
import { WhatsAppMessage } from '../../types/webhooks/whatsapp-message.types';

export class MessageHandler extends BaseHandler<WhatsAppWebhookPayload> {
  
  constructor(
    @inject(TYPES.WhatsappWebhook.MessageHandler) private handler: BaseHandler<WhatsAppMessage>
  ) {
    super();
  }

  protected canHandle(payload: WhatsAppWebhookPayload): boolean {
    return payload.entry.some((entry) =>
      entry.changes.some((change) => change.value.messages)
    );
  }

  protected async processPayload(
    payload: WhatsAppWebhookPayload
  ): Promise<void> {
    console.log('processing the message handler');
    await this.handler.handle(
      payload.entry[0].changes[0].value.messages as unknown as WhatsAppMessage
    );
  }
}
