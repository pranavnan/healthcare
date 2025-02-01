import { BaseWebhookHandler } from '../../handlers/base-webhook-handler';
import { BaseMessageHandler } from '../../handlers/messages/base-message-handler';
import { ImageHandler } from '../../handlers/messages/image-handler';
import { MessageHandler } from '../../handlers/messages/message-handler';
import { TextHandler } from '../../handlers/messages/text-handler';
import { StatusHandler } from '../../handlers/statuses/status-handler';
import { container } from '../container';
import { TYPES } from '../types';

//  bindings for main webhook handlers
container
  .bind<BaseWebhookHandler>(TYPES.WhatsappWebhook.WhatsappMessageHandler)
  .to(MessageHandler);
container
  .bind<BaseWebhookHandler>(TYPES.WhatsappWebhook.WhatsappStatusHandler)
  .to(StatusHandler);

// bindings for message handlers
container
  .bind<BaseMessageHandler>(TYPES.WhatsappWebhook.ImageHandler)
  .to(ImageHandler);
container
  .bind<BaseMessageHandler>(TYPES.WhatsappWebhook.TextHandler)
  .to(TextHandler);
