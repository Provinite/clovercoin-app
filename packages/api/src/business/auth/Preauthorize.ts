import { createMethodDecorator } from "type-graphql";
import {
  AuthInfo,
  AuthInfoFn,
  CompoundAuthInfo,
  isCompoundAuthInfo,
} from "./AuthInfo.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { NotAuthenticatedError } from "./NotAuthenticatedError.js";
import { assertNever } from "../../util/assertNever.js";
import { BaseError } from "../../errors/BaseError.js";

export const Preauthorize = (getAuthInfo?: AuthInfoFn) =>
  createMethodDecorator<AppGraphqlContext>(async (resolverData, next) => {
    const { principal, authorizerRegistry } = resolverData.context;
    if (!principal) {
      throw new NotAuthenticatedError();
    }
    if (!getAuthInfo) {
      return next();
    }
    const authInfo = await getAuthInfo(resolverData);

    const authorize = async (
      authInfo: AuthInfo | CompoundAuthInfo
    ): Promise<void> => {
      if (isCompoundAuthInfo(authInfo)) {
        if (authInfo.kind === "anyOf") {
          /**
           * For "anyOf" compound auth, we collect all of the errors
           * and throw the first if every single authinfo fails.
           */
          const errors: BaseError[] = [];
          for (const info of authInfo.authInfos) {
            // recurse over children
            const result = await safeRun(() => authorize(info));
            /**
             * Short circuit here because `anyOf` the provided
             * authinfos have passed now.
             */
            if (result.result === "ok") return;
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
            await authorize(info);
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

    /**
     * `authorize` will throw here if authorization fails, so we just await it
     * and forward its errors.
     */
    await authorize(authInfo);
    /**
     * Authorization passed, resolver approved to run.
     */
    return next();
  });

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
): Promise<{ result: "ok" } | { result: "error"; error: BaseError }> {
  try {
    await fn();
    return { result: "ok" };
  } catch (error: any) {
    return { result: "error", error };
  }
}

/**
 * Compound auth type. The operation will be authorized if any
 * auth info results in a passing authorize call. Logical `OR`
 *
 * @note The error from the first authorization is thrown if no
 * subsequent authorizations pass.
 *
 * @note If an authinfo passes authorization, further authinfos
 *  will not be evaluated (short-circuits).
 *
 * @param authInfos A list of {@link AuthInfo} or {@link CompoundAuthInfo}
 *  to evaluate in order.
 */
export const anyAuth = (
  ...authInfos: Array<AuthInfo | CompoundAuthInfo>
): CompoundAuthInfo => ({
  kind: "anyOf",
  authInfos,
});

/**
 * Compound auth type. The operation will not be authorized if any
 * auth info results in a failing authorize call. Logical `AND`
 *
 * @note Throws the error from the first failing auth info if one
 * fails (short-circuits).
 *
 * @param authInfos A list of {@link AuthInfo} or {@link CompoundAuthInfo}
 *  to evaluate in order.
 */
export const allAuth = (
  ...authInfos: Array<AuthInfo | CompoundAuthInfo>
): CompoundAuthInfo => ({
  kind: "allOf",
  authInfos,
});
