export interface IWhatsappMessageSendService {
  sendTextMessage(
    recipientId: string,
    text: string,
    preview_url: boolean
  ): Promise<string>;
}
