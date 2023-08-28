import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Identity } from "./Identity.js";

export type IdentityCreate = Pick<
  Identity,
  "displayName" | "email" | "canCreateCommunity" | "canListIdentities"
>;

export class IdentityController extends EntityController<
  Identity,
  Repository<Identity>,
  IdentityCreate
> {
  constructor({ identityRepository }: AppGraphqlContext) {
    super(identityRepository);
  }
}
