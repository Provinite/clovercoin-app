import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { SpeciesVariant } from "./SpeciesVariant.js";

export type TraitListCreate = Pick<SpeciesVariant, "speciesId" | "name">;
export type TraitListModify = Pick<
  Partial<SpeciesVariant>,
  "name" | "traitListEntries"
>;
export class TraitListController extends EntityController<
  SpeciesVariant,
  Repository<SpeciesVariant>,
  TraitListCreate,
  TraitListModify
> {
  constructor({ traitListRepository }: AppGraphqlContext) {
    super(traitListRepository);
  }
}
