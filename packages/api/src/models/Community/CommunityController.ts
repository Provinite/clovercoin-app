import { Repository } from "typeorm";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Community } from "./Community";

export type CommunityCreate = Pick<Community, "name">;

export class CommunityController {
  #repository: Repository<Community>;

  constructor({ communityRepository }: AppGraphqlContext) {
    this.#repository = communityRepository;
  }

  async create(createBody: CommunityCreate) {
    return this.#repository.save(this.#repository.create(createBody));
  }
}
