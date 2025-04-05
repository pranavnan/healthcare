import { inject } from 'inversify';
import {
  TextMessage,
  WhatsAppMessage,
} from '../../types/webhooks/whatsapp-message.types';
import { RAGService } from '../../services/rag.service';
import { TYPES } from '../../inversify/types';
import { IWhatsappMessageSendService } from '../../interface/whatsapp/message-send.interface';
import { BaseHandler } from '../base-webhook-handler';
import Logger from '../../utils/logger';
import { LogUtil } from '../../utils/log-util';

export class TextHandler extends BaseHandler<WhatsAppMessage> {
  constructor(
    @inject(TYPES.Automation.RAGService) private ragService: RAGService,
    @inject(TYPES.MessageSend.MessageSendService)
    private messageSendService: IWhatsappMessageSendService
  ) {
    super();
  }
  protected canHandle(
    payload: WhatsAppMessage
  ): payload is [TextMessage, ...any[]] {
    return payload[0].type === 'text';
  }

  protected async processPayload(
    payload: [TextMessage, ...any[]]
  ): Promise<void> {
    Logger.info('Text message received');
    LogUtil.logObject(payload, 'Text message payload');
    
    const recipient = payload[0].from;
    const message = await this.ragService.getRAGResponse(
      payload[0].text.body,
      recipient
    );
    
    if (message) {
      Logger.debug(`Sending response to recipient: ${recipient}`);
      await this.messageSendService.sendTextMessage(recipient, message, false);
      Logger.info(`Message sent to recipient: ${recipient}`);
    } else {
      Logger.warn(`No message generated for recipient: ${recipient}`);
    }
  }
}
