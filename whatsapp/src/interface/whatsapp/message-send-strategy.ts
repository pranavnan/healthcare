export interface IMessageSendStrategy {
  send(payload: any): Promise<any>;
}
