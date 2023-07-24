import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { CritterOwnershipChange } from "./CritterOwnershipChange.js";

export type CritterOwnershipChangeCreate = Pick<
  CritterOwnershipChange,
  "fromIdentityId" | "toIdentityId"
>;
export class CritterOwnershipChangeController extends EntityController<
  CritterOwnershipChange,
  Repository<CritterOwnershipChange>,
  any
> {
  constructor({ critterOwnershipChangeRepository }: AppGraphqlContext) {
    super(critterOwnershipChangeRepository);
  }
}
