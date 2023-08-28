import { AuthInfo, AuthScope } from "./AuthInfo.js";
import { NotAuthorizedError } from "./NotAuthorizedError.js";

export function validateAuthInfo(authScope: AuthInfo) {
  if (authScope.scope === AuthScope.Community && !authScope.communityId) {
    throw new NotAuthorizedError();
  }
  if (
    authScope.scope !== AuthScope.Community &&
    authScope.scope !== AuthScope.Global
  ) {
    throw new NotAuthorizedError();
  }
}
