import { asValue, AwilixContainer } from "awilix";
import { EntityManager } from "typeorm";
import { createChildContainer } from "../awilix/createChildContainer";
import { register } from "../awilix/register";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext";

export class TransactionProvider {
  #container: AwilixContainer;
  #entityManager: EntityManager;
  constructor({ container, entityManager }: AppGraphqlContext) {
    this.#container = container;
    this.#entityManager = entityManager;
  }

  runTransaction<T>(
    operation: (ctx: AppGraphqlContext) => Promise<T>
  ): Promise<T> {
    return this.#entityManager.transaction(async (tx) => {
      const txScopeContainer = createChildContainer(this.#container);
      register(txScopeContainer, "entityManager", asValue(tx));
      return await txScopeContainer.build(operation);
    });
  }
}
