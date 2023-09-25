import { isUUID } from "class-validator";
import {
  AuthInfo,
  AuthScope,
  CritterAuthInfo,
} from "../../business/auth/AuthInfo.js";
import { Authorizer } from "../../business/auth/Authorizer.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { assertNever } from "../../util/assertNever.js";
import type { Identity } from "../Identity/Identity.js";
import { CritterController } from "./CritterController.js";

/**
 * Authorizer for {@link AuthScope.Critter }-scoped authorization infos.
 * Supported Permissions:
 *   - "canEditOwn" - Every user is assumed to have rights to edit their own critters
 *       authorizes if the user is the owner of the specified critter.
 */
export class CritterAuthorizer extends Authorizer<AuthScope.Critter> {
  critterController: CritterController;
  principal: Identity | null;
  constructor({ critterController, principal }: AppGraphqlContext) {
    super(AuthScope.Critter);
    this.critterController = critterController;
    this.principal = principal;
  }

  validate(authInfo: CritterAuthInfo): void | Promise<void> {
    if (authInfo.scope !== AuthScope.Critter) {
      throw new NotAuthorizedError();
    }
    if (!isUUID(authInfo.critterId)) {
      throw new NotAuthorizedError();
    }
    if (!authInfo.permissions.length) {
      throw new NotAuthorizedError();
    }
  }

  async authorize(
    authInfo: { scope: AuthScope.Critter } & AuthInfo
  ): Promise<void> {
    if (!this.principal) {
      throw new NotAuthenticatedError();
    }
    await this.validate(authInfo);
    const { critterId, permissions } = authInfo;
    const critter = await this.critterController.findOneById(critterId);
    if (!critter) {
      throw new NotFoundError();
    }
    for (const permission of permissions) {
      let can = false;
      if (permission === "canEditOwn") {
        if (this.principal.id === critter.ownerId) {
          can = true;
        }
      } else {
        assertNever(permission);
      }
      if (!can) {
        throw new NotAuthorizedError();
      }
    }
  }
}
