import { IWhatsappMessageSendService } from '../../interface/whatsapp/message-send.interface';
import { WhatsappMessageSendService } from '../../services/message-send';
import { container } from '../container';
import { TYPES } from '../types';

container
  .bind<IWhatsappMessageSendService>(TYPES.MessageSend.MessageSendService)
  .toDynamicValue(() => {
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN!;
    const version = 'v20.0';
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID!;
    const headerOptions = {};
    const tokenType = 'Bearer';
    return new WhatsappMessageSendService(
      accessToken,
      version,
      phoneNumberId,
      headerOptions,
      tokenType
    );
  })
  .inSingletonScope();
