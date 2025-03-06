export interface IBaseHandler<T> {
  setNext(handler: IBaseHandler<T>): IBaseHandler<T>;
  handle(payload: T): Promise<void>;
}
