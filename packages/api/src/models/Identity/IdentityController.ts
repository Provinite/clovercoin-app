import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Identity } from "./Identity";

export type IdentityCreate = Pick<Identity, "displayName" | "email">;

export class IdentityController extends EntityController<
  Identity,
  Repository<Identity>,
  IdentityCreate
> {
  constructor({ identityRepository }: AppGraphqlContext) {
    super(identityRepository);
  }
}
