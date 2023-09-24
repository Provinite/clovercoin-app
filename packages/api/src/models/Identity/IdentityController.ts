import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Identity } from "./Identity.js";
import { IdentityPermissionKeys } from "./IdentityPermissionKeys.js";

export type IdentityCreate = Pick<
  Identity,
  | "displayName"
  | "email"
  | "canCreateCommunity"
  | "canListIdentities"
  | "canListInviteCodes"
  | "canCreateInviteCode"
  | "canGrantGlobalPermissions"
>;

export type IdentityModify = Pick<
  Partial<Identity>,
  "id" | IdentityPermissionKeys
>;

export class IdentityController extends EntityController<
  Identity,
  Repository<Identity>,
  IdentityCreate,
  IdentityModify
> {
  constructor({ identityRepository, transactionProvider }: AppGraphqlContext) {
    super(identityRepository, transactionProvider);
  }
}
