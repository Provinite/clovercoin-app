import { createMethodDecorator } from "type-graphql";
import { AuthInfoSpecifier, CompoundAuthInfo } from "./AuthInfo.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { NotAuthenticatedError } from "./NotAuthenticatedError.js";
import { runAuthorizationOrThrow } from "./runAuthorization.js";

export const Preauthorize = (specifier?: AuthInfoSpecifier) =>
  createMethodDecorator<AppGraphqlContext>(async (resolverData, next) => {
    const { principal } = resolverData.context;
    if (!principal) {
      throw new NotAuthenticatedError();
    }
    if (!specifier) {
      return next();
    }

    /**
     * `authorize` will throw here if authorization fails, so we just await it
     * and forward its errors.
     */
    await runAuthorizationOrThrow(specifier, resolverData);

    /**
     * Authorization passed, resolver approved to run.
     */
    return next();
  });

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
  ...authInfos: Array<AuthInfoSpecifier>
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
  ...authInfos: Array<AuthInfoSpecifier>
): CompoundAuthInfo => ({
  kind: "allOf",
  authInfos,
});
