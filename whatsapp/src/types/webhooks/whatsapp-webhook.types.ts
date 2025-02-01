import { StatusUpdate, WhatsAppMessage } from './whatsapp-message.types';

export type WhatsAppWebhookPayload = {
  object: string;
  entry: {
    id: string;
    changes: {
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts?: WhatsAppContact[];
        errors?: WhatsAppError[];
        messages?: WhatsAppMessage[];
        statuses?: StatusUpdate[];
      };
      field: string;
    }[];
  }[];
};

export type WhatsAppContact = {
  wa_id: string;
  profile: {
    name: string;
  };
};

export type WhatsAppError = {
  code: number;
  title: string;
  message: string;
  error_data?: {
    details: string;
  };
};

// export type WhatsAppMessage = {
//   id: string;
//   type:
//     | 'text'
//     | 'image'
//     | 'video'
//     | 'document'
//     | 'audio'
//     | 'sticker'
//     | 'location'
//     | 'interactive';
//   text?: string;
//   url?: string;
//   caption?: string;
//   mime_type?: string;
//   // Add other fields as needed
// };

// export type WhatsAppStatus = {
//   id: string;
//   status: 'sent' | 'delivered' | 'read';
//   timestamp: string;
//   recipient_id: string;
//   conversation?: {
//     id: string;
//     origin: {
//       type: string;
//     };
//   };
//   pricing?: {
//     billable: boolean;
//     category: string;
//   };
// };
