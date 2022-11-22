import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Species } from "./Species";

export type SpeciesCreate = Pick<Species, "name" | "communityId" | "iconUrl">;

export class SpeciesController extends EntityController<
  Species,
  Repository<Species>,
  SpeciesCreate
> {
  constructor({ speciesRepository }: AppGraphqlContext) {
    super(speciesRepository);
  }
}
