import { IBaseHandler } from '../interface/handlers/base-handler.interface';

export class RegistryHandler<T extends IBaseHandler<any>> {
  private handlers: T[] = [];

  registerHandler(handler: T) {
    this.handlers.push(handler);
  }

  buildHandlerChain(): T {
    if (!this.handlers.length) {
      throw new Error('No handlers registered');
    }
    const length = this.handlers.length;
    for (let i = 0; i < length - 1; i++) {
      this.handlers[i].setNext(this.handlers[i + 1]);
    }
    return this.handlers[0];
  }
}
