import { AuthChecker } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { verifyJwt } from "../../util/jwt/verifyJwt.js";
import { AuthKeys } from "./AuthKeys.js";

export const authChecker: AuthChecker<AppGraphqlContext> = async (
  { context: { authToken } },
  roles
) => {
  if (roles.includes(AuthKeys.Authenticated)) {
    if (authToken === null) {
      return false;
    }
    try {
      await verifyJwt(authToken);
      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};
