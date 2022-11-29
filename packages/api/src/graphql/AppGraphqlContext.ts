import type { AwilixContainer } from "awilix";
import type { Connection, EntityManager } from "typeorm";
import type { ControllerContext } from "../business/registerControllers";
import type { TransactionProvider } from "../db/TransactionProvider";
import type { RepositoryContext } from "../models/registerRepositories";
import type { Logger } from "winston";
export interface AppGraphqlContext
  extends RepositoryContext,
    ControllerContext {
  db: Connection;
  entityManager: EntityManager;
  _tgdContext: {
    requestId: string;
    typeormGetConnection: () => Connection;
  };
  container: AwilixContainer<AppGraphqlContext>;
  parentContainer: AwilixContainer<AppGraphqlContext>;
  transactionProvider: TransactionProvider;
  logger: Logger;
  contextName: string;
  requestId: string;
}
