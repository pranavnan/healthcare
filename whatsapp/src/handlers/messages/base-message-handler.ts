import { NotFoundError } from '@phntickets/booking';
import { IWhatsappMessageHandler } from '../../interface/whatsapp/whatsapp-message-handler.interface';
import { WhatsAppMessage } from '../../types/webhooks/whatsapp-message.types';

export abstract class BaseMessageHandler implements IWhatsappMessageHandler {
  private nextHandler: IWhatsappMessageHandler | null = null;

  protected abstract canHandleMessage(payload: WhatsAppMessage): boolean;
  protected abstract processMessagePayload(
    payload: WhatsAppMessage
  ): Promise<void>;

  setNext(handler: IWhatsappMessageHandler): IWhatsappMessageHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(payload: WhatsAppMessage) {
    if (this.canHandleMessage(payload)) {
      await this.processMessagePayload(payload);
    } else if (this.nextHandler) {
      await this.nextHandler.handle(payload);
    } else {
      throw new NotFoundError(
        `No handler found for the given payload ${JSON.stringify(payload)}`
      );
    }
  }
}
