import type { AwilixContainer } from "awilix";
import type { Connection, DataSource, EntityManager } from "typeorm";
import type { ControllerContext } from "../business/registerControllers";
import type { TransactionProvider } from "../db/TransactionProvider";
import type { RepositoryContext } from "../models/registerRepositories";
import type { Logger } from "winston";
import { PresignedUrlService } from "../s3/PresignedUrlService";
import { S3ClientConfig } from "@aws-sdk/client-s3";
export interface AppGraphqlContext
  extends RepositoryContext,
    ControllerContext {
  db: DataSource;
  entityManager: EntityManager;
  presignedUrlService: PresignedUrlService;
  s3Config: S3ClientConfig;
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
