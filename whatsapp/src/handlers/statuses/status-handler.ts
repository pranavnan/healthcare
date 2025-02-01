import { WhatsAppWebhookPayload } from '../../types/webhooks/whatsapp-webhook.types';
import { BaseWebhookHandler } from '../base-webhook-handler';

export class StatusHandler extends BaseWebhookHandler {
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
