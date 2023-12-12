import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

/**
 * Mark a controller method to be transactional. Requires that
 * `this.transactionProvider` is available. Causes this method
 * to be invoked on the instance of the controller given by the
 * transactional context via {@link ctxKey}.
 * @param ctxKey The key for this controller in the transactional context
 *
 * @example
 * class FooController extends EntityController<Foo> {
 *   // ... parts omitted
 *   @Transactional("fooController")
 *   doSomething(...) {
 *     this.updateOneById(...);
 *   }
 * }
 *
 * // is roughly equivalent to
 * class FooController {
 *   doSomething() {
 *     return this.transactionProvider.runTransaction(({fooController}) => {
 *       fooController.updateOneById(...)
 *     })
 *   }
 * }
 *
 */
export const Transactional =
  (ctxKey: keyof AppGraphqlContext): MethodDecorator =>
  (target, key, descriptor) => {
    const { value } = descriptor;
    if (!value) {
      return;
    }
    if (typeof value !== "function") {
      throw new Error("Invalid decorator target");
    }

    descriptor.value = function transactionWrapper(this: any, ...args: any[]) {
      return this.transactionProvider.runTransaction((ctx: any) => {
        return value.call(
          ctx[ctxKey],
          // just in case one of the args being passed
          // to the function is a cradle, we replace it
          // with the transactional cradle
          ...[...args].map((arg) => {
            if (arg && arg.container?.cradle === arg) {
              return ctx;
            }
            return arg;
          })
        );
      });
    } as any;
  };
