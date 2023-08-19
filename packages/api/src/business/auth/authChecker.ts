import { AuthChecker } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { verifyJwt } from "../../util/jwt/verifyJwt.js";

export const authChecker: AuthChecker<AppGraphqlContext> = async ({
  context: { authToken },
}) => {
  if (authToken === null) {
    return false;
  }
  try {
    await verifyJwt(authToken);
    return true;
  } catch (err) {
    return false;
  }
};
