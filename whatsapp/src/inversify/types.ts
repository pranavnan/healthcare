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
    ConversationHistoryService: Symbol.for('ConversationHistoryService'),
  },
  Pinecone: {
    DocumentRetrieverService: Symbol.for('DocumentRetrieverService'),
  },
  MessageSend: {
    MessageSendService: Symbol.for('MessageSendService'),
  },
  Appointments: {
    AppointmentService: Symbol.for('AppointmentService'),
    HandleAppointmentForDoctorAndLocation: Symbol.for(
      'HandleAppointmentForDoctorAndLocation'
    ),
  },
};
