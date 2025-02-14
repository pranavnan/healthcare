import { Request, Response } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { IWebhookHandler } from '../interface/whatsapp/webhook-handler.interface';
import { WhatsAppWebhookPayload } from '../types/webhooks/whatsapp-webhook.types';
import { inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { BaseWebhookHandler } from '../handlers/base-webhook-handler';

const { WEBHOOK_VERIFY_TOKEN } = process.env;

/**
 * [doc](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/)
 */
@controller('/whatsapp/webhook')
export class WhatsAppController {
  private handler: IWebhookHandler;

  constructor(
    @inject(TYPES.WhatsappWebhook.WhatsappMessageHandler)
    private messageHandler: BaseWebhookHandler,
    @inject(TYPES.WhatsappWebhook.WhatsappStatusHandler)
    private statusHandler: BaseWebhookHandler
  ) {
    messageHandler.setNext(statusHandler);

    this.handler = messageHandler;
  }

  @httpGet('/:botnumber')
  async verifyToken(req: Request, res: Response): Promise<void> {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log({ challenge, token, mode });

    if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
      res.status(200).send(challenge);
      console.log('Webhook verified successfully!');
    } else {
      res.sendStatus(403);
    }
  }

  @httpPost('/:botnumber')
  async webhookHandler(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as WhatsAppWebhookPayload;

      this.handler.handle(payload).then(r => console.log(r)).catch(console.error);

      res.status(200).send('OK');
    } catch (err) {
      console.error('Error while handling webhook:', err);
      res.status(200).send('OK');
      // res.status(500).send('Error while handling webhook');
    }
  }
}
