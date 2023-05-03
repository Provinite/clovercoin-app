import { noop } from "../ui/util/noop";

export interface Deferred<T = any> {
  promise: Promise<T>;
  resolve: (val: T | PromiseLike<T>) => void;
  reject: (reason: any) => void;
}

export const createDeferred = <T>(): Deferred<T> => {
  let resolve: Deferred<T>["resolve"] = noop;
  let reject: Deferred<T>["reject"] = noop;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { resolve, reject, promise };
};
