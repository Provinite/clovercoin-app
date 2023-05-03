import { createDeferred } from "../../test/deferred";
import { makeCancellable } from "./makeCancellable";
import { sleep } from "./sleep";

describe("util:makeCancellable", () => {
  it("cancels and calls a series of cleanup functions", async () => {
    const subscriptions: Record<string, any> = {};
    const subscribe = jest.fn((k: string, val: any) => {
      subscriptions[k] = val;
      return () => {
        delete subscriptions[k];
      };
    });

    const deferred = createDeferred<void>();

    const deferred2 = createDeferred<void>();
    async function* subscribeTest() {
      yield subscribe("foo", "bar");
      await deferred.promise;
      yield subscribe("bing", "bong");
      await deferred2.promise;
    }

    const cancellable = makeCancellable(subscribeTest);

    const cancel = cancellable();

    expect(subscribe).toHaveBeenCalledWith("foo", "bar");
    expect(subscriptions).toMatchInlineSnapshot(`
      Object {
        "foo": "bar",
      }
    `);
    deferred.resolve();
    await deferred.promise;
    await sleep();

    expect(subscribe).toHaveBeenCalledWith("bing", "bong");
    expect(subscriptions).toMatchInlineSnapshot(`
      Object {
        "bing": "bong",
        "foo": "bar",
      }
    `);

    cancel();
    expect(subscriptions).toEqual({});
  });
});
