import { Repository } from "typeorm";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { ensureArray } from "../../util/ensureArray";
import { TraitList } from "./TraitList";

export type TraitListCreate = Pick<TraitList, "speciesId" | "name">;

export class TraitListController {
  #repository: Repository<TraitList>;
  constructor({ traitListRepository }: AppGraphqlContext) {
    this.#repository = traitListRepository;
  }

  async create(createBody: TraitListCreate | TraitListCreate[]) {
    createBody = ensureArray(createBody);
    return this.#repository.save(
      createBody.map((createBody) =>
        this.#repository.create({
          ...createBody,
          species: {
            id: createBody.speciesId,
          },
        })
      )
    );
  }
}
