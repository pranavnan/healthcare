import { WhatsAppMessage } from '../../types/webhooks/whatsapp-message.types';

export interface IWhatsappMessageHandler {
  handle(payload: WhatsAppMessage): Promise<void>;
  setNext(handler: IWhatsappMessageHandler): IWhatsappMessageHandler;
}
