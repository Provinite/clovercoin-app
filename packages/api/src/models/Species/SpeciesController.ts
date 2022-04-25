import { Repository } from "typeorm";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Species } from "./Species";

export type SpeciesCreate = Pick<Species, "name" | "communityId">;

export class SpeciesController {
  #repository: Repository<Species>;
  constructor({ speciesRepository }: AppGraphqlContext) {
    this.#repository = speciesRepository;
  }

  async create(createBody: SpeciesCreate) {
    return this.#repository.save(
      this.#repository.create({
        ...createBody,
        community: {
          id: createBody.communityId,
        },
      })
    );
  }
}
