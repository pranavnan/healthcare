import { WhatsAppWebhookPayload } from '../../types/webhooks/whatsapp-webhook.types';

/**
 * Defines the interface for a WhatsApp webhook handler.
 * The `handle` method is responsible for processing the incoming WhatsApp webhook payload.
 * The `setNext` method allows chaining multiple webhook handlers together.
 */
export interface IWebhookHandler {
  handle(payload: WhatsAppWebhookPayload): Promise<void>;
  setNext(handler: IWebhookHandler): IWebhookHandler;
}
