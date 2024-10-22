import { createChildContainer } from "../awilix/createChildContainer.js";
import { TransactionProvider } from "../db/TransactionProvider.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { createTestContainer } from "../test/createTestContainer.js";
import { Transactional } from "./Transactional.js";

class Controller {
  transactionProvider: AppGraphqlContext["transactionProvider"];
  constructor({ transactionProvider }: AppGraphqlContext) {
    this.transactionProvider = transactionProvider;
    jest.spyOn(this, "bar" as any);
  }

  @Transactional("controller")
  async transactionalCallBar() {
    this.bar();
  }

  bar() {}
}

describe("decorator:Transactional", () => {
  it("runs in a tx and binds to the transactional instance of this controller", async () => {
    const container = await createTestContainer<AppGraphqlContext>({
      controller: Controller,
      transactionProvider: MockTransactionProvider,
    });

    const controller = container.resolve("controller");
    const transactionProvider = container.resolve(
      "transactionProvider"
    ) as TransactionProvider & MockTransactionProvider;

    jest.spyOn(transactionProvider, "runTransaction");
    jest.spyOn(controller, "bar");

    await controller.transactionalCallBar();

    const txController =
      transactionProvider.lastTransactionalContainer.resolve("controller");

    expect(controller.bar).not.toHaveBeenCalled();
    expect(txController.bar).toHaveBeenCalledTimes(1);
  });
});

declare module "../graphql/AppGraphqlContext.js" {
  export interface AppGraphqlContext {
    controller: Controller;
  }
}

class MockTransactionProvider {
  container: AppGraphqlContext["container"];
  lastTransactionalContainer!: AppGraphqlContext["container"];
  constructor({ container }: AppGraphqlContext) {
    this.container = container;
  }
  runTransaction(fn: (args: AppGraphqlContext) => any) {
    this.lastTransactionalContainer = createChildContainer(
      this.container,
      "tx"
    );
    return this.lastTransactionalContainer.build(fn);
  }
}
