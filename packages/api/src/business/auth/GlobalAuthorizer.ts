import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Identity } from "../../models/Identity/Identity.js";
import { AuthScope, GlobalAuthInfo } from "./AuthInfo.js";
import { Authorizer } from "./Authorizer.js";
import { NotAuthenticatedError } from "./NotAuthenticatedError.js";
import { NotAuthorizedError } from "./NotAuthorizedError.js";

export class GlobalAuthorizer extends Authorizer<AuthScope.Global> {
  principal: Identity | null;
  constructor({ principal }: AppGraphqlContext) {
    super(AuthScope.Global);
    this.principal = principal;
  }
  authorize({ permissions, scope }: GlobalAuthInfo): void {
    if (!this.principal) {
      throw new NotAuthenticatedError();
    }
    if (scope !== this.scope) {
      throw new NotAuthorizedError();
    }
    for (const permission of permissions) {
      if (!this.principal[permission]) {
        throw new NotAuthorizedError();
      }
    }
  }
}
