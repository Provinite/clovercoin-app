import { AuthScope, IdentityAuthInfo } from "../../business/auth/AuthInfo.js";
import { Authorizer } from "../../business/auth/Authorizer.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { assertNever } from "../../util/assertNever.js";
import { Identity } from "./Identity.js";

export class IdentityAuthorizer extends Authorizer<AuthScope.Identity> {
  principal: Identity | null;
  constructor({ principal }: AppGraphqlContext) {
    super(AuthScope.Identity);
    this.principal = principal;
  }
  authorize({ permissions, scope, identityId }: IdentityAuthInfo): void {
    if (!this.principal) {
      throw new NotAuthenticatedError();
    }
    if (scope !== this.scope) {
      throw new NotAuthorizedError();
    }
    if (permissions.length === 0) {
      throw new NotAuthorizedError();
    }
    for (const permission of permissions) {
      if (permission === "canViewPendingInvites") {
        // users can see their own pending invites
        if (this.principal.id !== identityId) {
          throw new NotAuthorizedError();
        }
      } else if (permission === "canAnswerInvites") {
        // users can answer their own pending invites
        if (this.principal.id !== identityId) {
          throw new NotAuthorizedError();
        }
      } else if (permission === "canViewEmail") {
        if (this.principal.id !== identityId) {
          throw new NotAuthorizedError();
        }
      } else {
        assertNever(permission);
      }
    }
  }
}
