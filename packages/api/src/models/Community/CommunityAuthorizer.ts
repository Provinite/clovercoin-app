import { isUUID } from "class-validator";
import { AuthScope, CommunityAuthInfo } from "../../business/auth/AuthInfo.js";
import { Authorizer } from "../../business/auth/Authorizer.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { CritterController } from "../Critter/CritterController.js";
import { Identity } from "../Identity/Identity.js";

export class CommunityAuthorizer extends Authorizer<AuthScope.Community> {
  critterController: CritterController;
  principal: Identity | null;
  constructor({ critterController, principal }: AppGraphqlContext) {
    super(AuthScope.Community);
    this.critterController = critterController;
    this.principal = principal;
  }

  authorize({ scope, communityId, permissions }: CommunityAuthInfo): void {
    if (!this.principal) {
      throw new NotAuthenticatedError();
    }
    if (scope !== this.scope) {
      throw new NotAuthorizedError();
    }
    if (!isUUID(communityId)) {
      throw new NotAuthorizedError();
    }

    /**
     * If no permissions are specified, we just verify that the
     * user has _any_ role in the specified community.
     */
    if (permissions.length === 0) {
      const hasAnyMembership = this.principal.communityMemberships.some(
        (cm) => cm.role.communityId === communityId
      );
      if (!hasAnyMembership) throw new NotAuthorizedError();
    }

    /**
     * For one or more permissions specified, we verify that the
     * user has at least one role that satisfies every permission
     * specified.
     */
    for (const permission of permissions) {
      let permissionSatisfied = false;
      for (const { role } of this.principal.communityMemberships) {
        if (role.communityId === communityId && role[permission] === true) {
          permissionSatisfied = true;
          break;
        }
      }
      if (!permissionSatisfied) {
        throw new NotAuthorizedError();
      }
    }
  }
}
