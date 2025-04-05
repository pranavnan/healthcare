/**
 * Defines the interface for a WhatsApp webhook handler.
 * The `handle` method is responsible for processing the incoming WhatsApp webhook payload.
 * The `setNext` method allows chaining multiple webhook handlers together.
 */
export interface IWebhookHandler<T> {
  handle(payload: T): Promise<void>;
  setNext(handler: IWebhookHandler<T>): IWebhookHandler<T>;
}
