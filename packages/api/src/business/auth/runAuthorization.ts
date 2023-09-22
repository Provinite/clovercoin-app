import { BaseError } from "@clovercoin/api-client";
import { ArgumentValidationError, ResolverData } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { assertNever } from "../../util/assertNever.js";
import { AuthInfoSpecifier, isCompoundAuthInfo } from "./AuthInfo.js";

const NO_AUTH = {};

export const runAuthorizationOrThrow = async (
  authInfo: AuthInfoSpecifier,
  resolverData: ResolverData<AppGraphqlContext>
): Promise<typeof NO_AUTH | void> => {
  const { authorizerRegistry } = resolverData.context;
  if (typeof authInfo === "function") {
    authInfo = await authInfo(resolverData);
  }
  if (!authInfo) {
    /**
     * `null` specifiers can be ignored. This allows {@link AuthInofFn}s
     * to conditionally set themselves to be ignored if they don't apply
     * to the current graphql operation.
     */
    return NO_AUTH;
  }
  if (isCompoundAuthInfo(authInfo)) {
    if (authInfo.kind === "anyOf") {
      /**
       * For "anyOf" compound auth, we collect all of the errors
       * and throw the first if every single authinfo fails.
       */
      const errors: BaseError[] = [];
      for (const info of authInfo.authInfos) {
        // recurse over children
        const result = await runAuthorization(info, resolverData);
        if (
          result.result === "error" &&
          result.error instanceof ArgumentValidationError
        ) {
          throw result.error;
        }
        /**
         * Short circuit here because `anyOf` the provided
         * authinfos have passed now.
         */
        if (result.result === "ok") {
          if (result.value === NO_AUTH) {
            continue;
          }
          return;
        }

        errors.push(result.error);
      }
      /**
       * We never short-circuited, so we rethrow the first
       * error here. This does result in various errors being
       * swallowed, so will need some improved logging around
       * this most likely.
       */
      throw errors[0];
    } else if (authInfo.kind === "allOf") {
      /**
       * For "allOf" compound auth, we just run until the first
       * failure and forward its error.
       */
      for (const info of authInfo.authInfos) {
        // recurse over children
        await runAuthorizationOrThrow(info, resolverData);
      }
      /**
       * No authorizations in the list failed, so this is a passing
       * authorization.
       */
      return;
    } else {
      assertNever(authInfo.kind);
    }
  } else {
    /**
     * For an individual auth info, we simply run the associated authorizer.
     */
    const authorizer = authorizerRegistry.getAuthorizer(authInfo.scope);
    await authorizer.authorize(authInfo);
  }
};

export const runAuthorization = (
  ...args: Parameters<typeof runAuthorizationOrThrow>
) => safeRun(() => runAuthorizationOrThrow(...args));

/**
 * Run a function, and return an object indicating whether it threw or not
 * as well as the error if it did throw.
 *
 * @note This function will never throw
 *
 * @param fn The potentially-error-throwing void function to run
 * @returns A result object indicating if an error happened, and
 *  if so the error itself.
 */
async function safeRun(
  fn: () => any
): Promise<
  | { result: "ok"; value: typeof NO_AUTH | void }
  | { result: "error"; error: BaseError }
> {
  try {
    const value = await fn();
    return { result: "ok", value };
  } catch (error: any) {
    return { result: "error", error };
  }
}
