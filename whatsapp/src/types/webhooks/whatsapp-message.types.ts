/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Common base interface for all WhatsApp messages.
 */
export interface BaseMessage {
  /** The sender’s phone number */
  from: string;
  /** Unique message identifier */
  id: string;
  /** Timestamp when the message was sent (as a string or Unix timestamp) */
  timestamp: string;
  /** The type of message (text, image, video, etc.) */
  type: string;
}

/**
 * Text Message
 */
export interface TextMessage extends BaseMessage {
  type: 'text';
  text: {
    body: string;
  };
}

/**
 * Reaction Message (when a user reacts to a message)
 */
export interface ReactionMessage extends BaseMessage {
  type: 'reaction';
  reaction: {
    message_id: string;
    emoji: string;
  };
}

/**
 * Media Message - covers images, videos, audio, documents, and stickers.
 * Each media type is optional so that you can have a single interface for several media subtypes.
 */
export interface MediaMessage extends BaseMessage {
  type: 'image' | 'video' | 'audio' | 'document' | 'sticker';
  // The following properties are defined depending on the media type
  image?: {
    id: string;
    caption?: string;
    mime_type: string;
    sha256: string;
  };
  video?: {
    id: string;
    caption?: string;
    mime_type: string;
    sha256: string;
  };
  audio?: {
    id: string;
    mime_type: string;
    sha256: string;
  };
  document?: {
    id: string;
    filename?: string;
    mime_type: string;
    sha256: string;
  };
  sticker?: {
    id: string;
    mime_type: string;
    sha256: string;
  };
}

/**
 * Location Message
 */
export interface LocationMessage extends BaseMessage {
  type: 'location';
  location: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
}

/**
 * Contacts Message
 */
export interface ContactsMessage extends BaseMessage {
  type: 'contacts';
  contacts: Array<{
    addresses?: Array<{
      city?: string;
      country?: string;
      country_code?: string;
      state?: string;
      street?: string;
      type?: string; // e.g., HOME or WORK
      zip?: string;
    }>;
    birthday?: string;
    emails?: Array<{
      email: string;
      type?: string; // e.g., HOME or WORK
    }>;
    name?: {
      formatted_name?: string;
      first_name?: string;
      last_name?: string;
      middle_name?: string;
      prefix?: string;
      suffix?: string;
    };
    org?: {
      company?: string;
      department?: string;
      title?: string;
    };
    phones?: Array<{
      phone: string;
      wa_id?: string;
      type?: string; // e.g., HOME or WORK
    }>;
    urls?: Array<{
      url: string;
      type?: string; // e.g., HOME or WORK
    }>;
  }>;
}

/**
 * Interactive Message for button replies or list replies.
 */
export interface InteractiveMessage extends BaseMessage {
  type: 'interactive';
  interactive: {
    type: 'button_reply' | 'list_reply';
    // For a list reply
    list_reply?: {
      id: string;
      title: string;
      description?: string;
    };
    // For a button reply
    button_reply?: {
      id: string;
      title: string;
    };
  };
  // Optional context that may refer to the original message
  context?: {
    from: string;
    id: string;
  };
}

/**
 * Order Message when a customer places an order.
 */
export interface OrderMessage extends BaseMessage {
  type: 'order';
  order: {
    catalog_id: string;
    product_items: Array<{
      product_retailer_id: string;
      quantity: number;
      item_price: number;
      currency: string;
    }>;
    text?: string; // Optional text sent with the order
  };
  context?: {
    from: string;
    id: string;
  };
}

/**
 * System Message used for system events (e.g. user changed phone number).
 */
export interface SystemMessage extends BaseMessage {
  type: 'system';
  system: {
    body: string;
    new_wa_id?: string;
    type: string; // e.g., "user_changed_number"
  };
}

/**
 * Unknown or Unsupported Message
 */
export interface UnknownMessage extends BaseMessage {
  type: 'unknown' | 'unsupported';
  errors?: Array<{
    code: number;
    title: string;
    details?: string;
    message?: string;
    error_data?: any;
    href?: string;
  }>;
}

/**
 * You might also receive status updates separately. Here’s an example for message statuses.
 */
export interface StatusUpdate {
  statuses: Array<{
    id: string;
    status: 'sent' | 'delivered' | 'read' | 'failed';
    timestamp: string;
    recipient_id: string;
    conversation?: {
      id: string;
      expiration_timestamp?: string;
      origin?: {
        type: string;
      };
    };
    pricing?: {
      billable: boolean;
      pricing_model: string;
      category: string;
    };
    errors?: Array<{
      code: number;
      title: string;
      message?: string;
      error_data?: any;
      href?: string;
    }>;
  }>;
}

/**
 * Union type representing any possible WhatsApp message received via the webhook.
 */
export type WhatsAppMessage = Array<
  | TextMessage
  | ReactionMessage
  | MediaMessage
  | LocationMessage
  | ContactsMessage
  | InteractiveMessage
  | OrderMessage
  | SystemMessage
  | UnknownMessage
>;
