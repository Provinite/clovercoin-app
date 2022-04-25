import { Repository } from "typeorm";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Trait } from "./Trait";

export type TraitCreate = Pick<Trait, "name" | "valueType">;

export class TraitController {
  #repository: Repository<Trait>;
  constructor({ traitRepository }: AppGraphqlContext) {
    this.#repository = traitRepository;
  }

  async create(createBody: TraitCreate) {
    return this.#repository.save(this.#repository.create(createBody));
  }
}
