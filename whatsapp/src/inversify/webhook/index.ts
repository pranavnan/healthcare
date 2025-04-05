import { BaseHandler } from '../../handlers/base-webhook-handler';
import { ImageHandler } from '../../handlers/messages/image-handler';
import { MessageHandler } from '../../handlers/messages/message-handler';
import { TextHandler } from '../../handlers/messages/text-handler';
import { StatusHandler } from '../../handlers/statuses/status-handler';
import { WhatsAppMessage } from '../../types/webhooks/whatsapp-message.types';
import { WhatsAppWebhookPayload } from '../../types/webhooks/whatsapp-webhook.types';
import { container } from '../container';
import { TYPES } from '../types';

//  bindings for main webhook handlers
container
  .bind<BaseHandler<WhatsAppWebhookPayload>>(TYPES.WhatsappWebhook.WhatsappMessageHandler)
  .to(MessageHandler);

container
  .bind<BaseHandler<WhatsAppWebhookPayload>>(TYPES.WhatsappWebhook.WhatsappStatusHandler)
  .to(StatusHandler);

container.bind<BaseHandler<WhatsAppWebhookPayload>>(TYPES.WhatsappWebhook.MainHandler).toDynamicValue((context) => {
  const messageHandler = context.container.get<BaseHandler<WhatsAppWebhookPayload>>(TYPES.WhatsappWebhook.WhatsappMessageHandler);
  const statusHandler = context.container.get<BaseHandler<WhatsAppWebhookPayload>>(TYPES.WhatsappWebhook.WhatsappStatusHandler);

  messageHandler.setNext(statusHandler);

  return messageHandler;
})

// bindings for message handlers
container
  .bind<BaseHandler<WhatsAppMessage>>(TYPES.WhatsappWebhook.ImageHandler)
  .to(ImageHandler);

container
  .bind<BaseHandler<WhatsAppMessage>>(TYPES.WhatsappWebhook.TextHandler)
  .to(TextHandler);

container.bind<BaseHandler<WhatsAppMessage>>(TYPES.WhatsappWebhook.MessageHandler).toDynamicValue((context) => {
  const imageHandler = context.container.get<BaseHandler<WhatsAppMessage>>(TYPES.WhatsappWebhook.ImageHandler);
  const textHandler = context.container.get<BaseHandler<WhatsAppMessage>>(TYPES.WhatsappWebhook.TextHandler);

  textHandler.setNext(imageHandler);

  return textHandler;
})