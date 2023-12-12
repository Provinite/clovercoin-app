import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { SpeciesVariant } from "./SpeciesVariant.js";

export type SpeciesVariantCreate = Pick<SpeciesVariant, "speciesId" | "name">;
export type SpeciesVariantModify = Pick<
  Partial<SpeciesVariant>,
  "name" | "traitListEntries"
>;
export class SpeciesVariantController extends EntityController<
  SpeciesVariant,
  Repository<SpeciesVariant>,
  SpeciesVariantCreate,
  SpeciesVariantModify
> {
  constructor({
    speciesVariantRepository,
    transactionProvider,
  }: AppGraphqlContext) {
    super(speciesVariantRepository, transactionProvider);
  }
}
