import { Repository } from "typeorm";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { EnumValue } from "./EnumValue";

export type EnumValueCreate = Pick<EnumValue, "name" | "trait">;

export class EnumValueController {
  #repository: Repository<EnumValue>;
  constructor({ enumValueRepository }: AppGraphqlContext) {
    this.#repository = enumValueRepository;
  }

  async create(createBody: EnumValueCreate | EnumValueCreate[]) {
    if (!Array.isArray(createBody)) {
      createBody = [createBody];
    }
    return this.#repository.save(
      createBody.map((createBody) => this.#repository.create(createBody))
    );
  }
}
