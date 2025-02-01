import { NextFunction, Request, Response } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { IWebhookHandler } from '../interface/whatsapp/webhook-handler.interface';
import { WhatsAppWebhookPayload } from '../types/webhooks/whatsapp-webhook.types';
import { inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { BaseWebhookHandler } from '../handlers/base-webhook-handler';

const { WEBHOOK_VERIFY_TOKEN } = process.env;

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

      await this.handler.handle(payload);

      res.status(200).send('OK');
    } catch (err) {
      console.error('Error while handling webhook:', err);
      res.status(200).send('OK');
      // res.status(500).send('Error while handling webhook');
    }

    /*
    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

    console.dir({ message, 'req.body': req.body }, { depth: null });

    if (message?.type == 'text') {
      const myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer EAAF2DM2fAtUBO9hpS4pTXu3yFOOOaiSrbZCqv1mzGJSqtmn2aIqCQzjj1K71LJqZBBvGmDRjLvev9RsghZAlezUTl8wx3LKe83NH4b0Xlw4iakUAeiqY7Q5hZC8jkCumNz4DDDn8WVJRE9xYc9BrWJEHMoDMWlSo0V1vXyjh09NAANDQaaC4c7qBj58EXMfIjAZDZD'
      );
      myHeaders.append('Content-Type', 'application/json');

      // const requestOptions = ;

      await fetch('https://graph.facebook.com/v20.0/227707410434620/messages', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: 918888574689,
          type: 'text',
          text: {
            // the text object
            preview_url: false,
            body: 'hi how are u',
          },
        }),
      })
        .then((response) => response.text())
        .then((result) => console.log(result));
    }
    */
  }
}
