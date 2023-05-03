import { invoke } from "./invoke";

/**
 * Create a function that can be invoked to execute an async generator
 * function. It will return a cancel function that can be invoked to
 * halt execution of the generator function the next time it yields
 * to the event loop.
 * @param fn The generator to execute. The function should yield whenever
 *  cancellation should be considered. This is usually in the form of
 *  `yield`ing after every `await`. Note that if this function
 *  `yield`s a function, it will be taken as a cleanup function
 *  to be invoked when the cancel function is invoked. You may
 *  yield any number of cleanup functions, and they will all be
 *  executed.
 * @returns A function that can be invoked to start a cancellable
 *  invocation of the generator function.
 */
export const makeCancellable = (fn: () => AsyncGenerator) => {
  return () => {
    let cancelled = false;
    const cleanupFunctions: Array<() => void> = [];

    invoke(async () => {
      for await (const cleanup of fn()) {
        if (typeof cleanup === "function") {
          cleanupFunctions.push(cleanup as () => void);
        }
        if (cancelled) {
          return;
        }
      }
    });

    return () => {
      cancelled = true;
      cleanupFunctions.forEach((cf) => cf());
    };
  };
};
