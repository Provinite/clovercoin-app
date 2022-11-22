import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Trait } from "./Trait";

export type TraitCreate = Pick<Trait, "name" | "valueType" | "speciesId">;

export class TraitController extends EntityController<
  Trait,
  Repository<Trait>,
  TraitCreate
> {
  constructor({ traitRepository }: AppGraphqlContext) {
    super(traitRepository);
  }
}
