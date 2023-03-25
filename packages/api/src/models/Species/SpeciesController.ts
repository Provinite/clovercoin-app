import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Species } from "./Species";

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
