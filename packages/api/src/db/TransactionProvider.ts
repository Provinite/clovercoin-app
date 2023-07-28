import { asValue, AwilixContainer } from "awilix";
import { EntityManager } from "typeorm/entity-manager/EntityManager.js";
import { v4 } from "uuid";
import { createChildContainer } from "../awilix/createChildContainer.js";
import { register } from "../awilix/register.js";
import type { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

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
    if (this.#entityManager.queryRunner?.isTransactionActive) {
      return this.#container.build(operation);
    }
    return this.#entityManager.transaction(async (tx) => {
      const txScopeContainer = createChildContainer(
        this.#container,
        `tx.${v4()}`
      );
      register(txScopeContainer, "entityManager", asValue(tx));
      return await txScopeContainer.build(operation);
    });
  }
}
