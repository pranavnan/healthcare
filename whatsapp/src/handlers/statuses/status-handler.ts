import { WhatsAppWebhookPayload } from '../../types/webhooks/whatsapp-webhook.types';
import { BaseHandler } from '../base-webhook-handler';

export class StatusHandler extends BaseHandler<WhatsAppWebhookPayload> {
  protected canHandle(payload: WhatsAppWebhookPayload): boolean {
    return payload.entry.some((entry) =>
      entry.changes.some((change) => change.value.statuses)
    );
  }
  protected async processPayload(
    payload: WhatsAppWebhookPayload
  ): Promise<void> {
    console.log('Status update received:', payload);
  }
}
