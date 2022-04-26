import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { CritterTrait } from "./CritterTrait";

export class CritterTraitController extends EntityController<
  CritterTrait,
  Repository<CritterTrait>,
  any
> {
  constructor({ critterTraitRepository }: AppGraphqlContext) {
    super(critterTraitRepository);
  }
}
