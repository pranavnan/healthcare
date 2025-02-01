import { BaseWebhookHandler } from '../base-webhook-handler';
import { WhatsAppWebhookPayload } from '../../types/webhooks/whatsapp-webhook.types';
import { TYPES } from '../../inversify/types';
import { BaseMessageHandler } from './base-message-handler';
import { inject } from 'inversify';
import { WhatsAppMessage } from '../../types/webhooks/whatsapp-message.types';

export class MessageHandler extends BaseWebhookHandler {
  private handler: BaseMessageHandler;
  constructor(
    @inject(TYPES.WhatsappWebhook.TextHandler) textHandler: BaseMessageHandler,
    @inject(TYPES.WhatsappWebhook.ImageHandler) imageHandler: BaseMessageHandler
  ) {
    super();

    textHandler.setNext(imageHandler);

    this.handler = textHandler;
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
