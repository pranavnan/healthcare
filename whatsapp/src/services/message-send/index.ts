import { IWhatsappMessageSendService } from '../../interface/whatsapp/message-send.interface';
import {
  Version,
  PhoneNumberId,
  HeaderOptions,
  TokenType,
} from '../../types/whatsapp-messages/message-send.types';
import { BaseMessageSendService } from './base-message.service';

export class WhatsappMessageSendService
  extends BaseMessageSendService
  implements IWhatsappMessageSendService
{
  /**
   * Creates an instance of WhatsappMessageSendService.
   *
   * @param {string} access_token - The token used to authenticate WhatsApp API requests.
   * @param {Version} version - The version of the WhatsApp Messaging API to use.
   * @param {PhoneNumberId} phoneNumberId - The unique identifier for the WhatsApp phone number.
   * @param {HeaderOptions} [headerOptions={}] - Optional header configurations for the API requests.
   * @param {TokenType} [tokenType='Bearer'] - The type of token used for authentication; defaults to 'Bearer'.
   */
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId,
    headerOptions: HeaderOptions = {},
    tokenType: TokenType = 'Bearer'
  ) {
    super(access_token, version, phoneNumberId, headerOptions, tokenType);
  }

  // write an implementation for the sendTextMessage method
  // that sends a text message using the WhatsApp Messaging API
  // The method should accept the following parameters:
  // - recipientId: string - the recipient's phone number
  // - text: string - the message to send
  // The method should return a Promise that resolves to a string
  // representing the message ID of the sent message
  async sendTextMessage(
    recipientId: string,
    text: string,
    preview_url: boolean = false
  ): Promise<any> {
    // Implement the method here
    // payload should be below

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientId,
      type: 'text',
      text: {
        preview_url: preview_url,
        body: text,
      },
    };

    return this.send(payload);
  }
}
