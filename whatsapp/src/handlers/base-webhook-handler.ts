import { NotFoundError } from '@phntickets/booking';
import { IWebhookHandler } from '../interface/whatsapp/webhook-handler.interface';
import { WhatsAppWebhookPayload } from '../types/webhooks/whatsapp-webhook.types';

/**
 * Defines the base implementation of a webhook handler that can be used to process incoming webhook requests.
 * Provides a mechanism to chain multiple handlers together using the Chain of Responsibility pattern.
 */
export abstract class BaseWebhookHandler implements IWebhookHandler {
  private nextHandler: IWebhookHandler | null = null;
  /**
   * Determines whether the current handler can process the provided WhatsApp webhook payload.
   * @param payload - The incoming WhatsApp webhook payload to be handled.
   * @returns `true` if the current handler can process the payload, `false` otherwise.
   */
  protected abstract canHandle(payload: WhatsAppWebhookPayload): boolean;
  /**
   * Processes the provided WhatsApp webhook payload.
   * @param payload - The incoming WhatsApp webhook payload to be processed.
   * @returns A Promise that resolves when the payload has been processed.
   */
  protected abstract processPayload(
    payload: WhatsAppWebhookPayload
  ): Promise<void>;

  /**
   * Sets the next webhook handler in the chain of responsibility.
   * @param handler - The next webhook handler to be called in the chain.
   * @returns The handler that was just set as the next in the chain.
   */
  setNext(handler: IWebhookHandler): IWebhookHandler {
    this.nextHandler = handler;
    return handler;
  }

  /**
   * Handles the incoming WhatsApp webhook payload by processing it if the current handler can handle it, or passing it to the next handler in the chain if one is set.
   * If no handler can handle the payload, a `NotFoundError` is thrown.
   * @param payload - The incoming WhatsApp webhook payload to be handled.
   * @returns A Promise that resolves when the payload has been processed.
   */
  async handle(payload: WhatsAppWebhookPayload) {
    if (this.canHandle(payload)) {
      await this.processPayload(payload);
    } else if (this.nextHandler) {
      await this.nextHandler.handle(payload);
    } else {
      throw new NotFoundError(
        `No handler found for the given whatsapp webhook payload ${JSON.stringify(
          payload
        )}`
      );
    }
  }
}
