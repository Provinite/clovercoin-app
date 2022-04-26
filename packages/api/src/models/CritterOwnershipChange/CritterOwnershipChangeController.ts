import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { CritterOwnershipChange } from "./CritterOwnershipChange";

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
