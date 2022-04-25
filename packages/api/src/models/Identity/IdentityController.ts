import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Identity } from "./Identity";

export class IdentityController {
  #repository: AppGraphqlContext["identityRepository"];
  constructor({ identityRepository }: AppGraphqlContext) {
    this.#repository = identityRepository;
  }

  async createIdentity({
    displayName,
    email,
  }: Pick<Identity, "displayName" | "email">) {
    return this.#repository.save(
      this.#repository.create({ displayName, email })
    );
  }
}
