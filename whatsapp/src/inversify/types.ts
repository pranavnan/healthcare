export const TYPES = {
  WhatsappWebhook: {
    WebhookHandlerController: Symbol.for('WebhookHandlerController'),
    WhatsappMessageHandler: Symbol.for('WhatsappMessageHandler'),
    WhatsappStatusHandler: Symbol.for('WhatsappStatusHandler'),
    SubMessageHandler: Symbol.for('SubMessageHandler'),
    TextHandler: Symbol.for('TextHandler'),
    ImageHandler: Symbol.for('ImageHandler'),
  },
  Automation: {
    RAGService: Symbol.for('RAGService'),
  },
};
