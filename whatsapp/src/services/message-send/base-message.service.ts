import axios, { Axios } from 'axios';
import { IMessageSendStrategy } from '../../interface/whatsapp/message-send-strategy';
import {
  HeaderOptions,
  PhoneNumberId,
  TokenType,
  Version,
} from '../../types/whatsapp-messages/message-send.types';

export abstract class BaseMessageSendService implements IMessageSendStrategy {
  /**
   * The access token used for API authentication.
   */
  protected accessToken: string;

  /**
   * The Axios instance configured with the API's base URL and headers.
   */
  protected readonly api: Axios;

  /**
   * The type of token used for authentication, either 'Bearer' or 'OAuth'.
   */
  protected token_type: TokenType;
  /**
   * The phone number ID associated with the WhatsApp Business account.
   */
  protected phoneNumberId: PhoneNumberId;

  /**
   * Creates an instance of ShibaApiBase.
   *
   * @param access_token - The access token used for authentication.
   * @param version - The API version, formatted as 'v<number>'.
   * @param headerOptions - Optional custom headers to include in the request.
   * @param tokenType - The token type for authorization. Defaults to 'Bearer'.
   */
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId,
    headerOptions: HeaderOptions = {},
    tokenType: TokenType = 'Bearer'
  ) {
    this.accessToken = access_token;
    this.token_type = tokenType;
    this.phoneNumberId = phoneNumberId;

    // Setting up default headers with content type and authorization token
    const headers: HeaderOptions = {
      'Content-Type': 'application/json',
      Authorization: `${tokenType} ${access_token}`,
      ...headerOptions,
    };

    // Creating the Axios instance with the configured base URL and headers
    this.api = axios.create({
      baseURL: `https://graph.facebook.com/${version}`,
      headers,
    });
  }

  async send(payload: any): Promise<any> {
    try {
      const response = await this.api.post(
        `/${this.phoneNumberId}/messages`,
        payload
      );
      console.dir({ response: response.data }, { depth: null });
      return response.data;
    } catch (error) {
      console.error('Error while sending message:', error);
    }
  }
}
