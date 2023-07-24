import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Species } from "./Species.js";

export type SpeciesCreate = Pick<Species, "name" | "communityId">;
export type SpeciesUpdate = Partial<Pick<Species, "hasImage">>;
export class SpeciesController extends EntityController<
  Species,
  Repository<Species>,
  SpeciesCreate,
  SpeciesUpdate
> {
  constructor({ speciesRepository }: AppGraphqlContext) {
    super(speciesRepository);
  }
}
