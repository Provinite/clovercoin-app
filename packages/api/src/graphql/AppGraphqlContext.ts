import type { AwilixContainer } from "awilix";
import type { DataSource, EntityManager } from "typeorm";
import type { ControllerContext } from "../business/registerControllers.js";
import type { TransactionProvider } from "../db/TransactionProvider.js";
import type { RepositoryContext } from "../models/registerRepositories.js";
import { PresignedUrlService } from "../s3/PresignedUrlService.js";
import { S3ClientConfig } from "@aws-sdk/client-s3";
import { Logger } from "winston";
export interface AppGraphqlContext
  extends RepositoryContext,
    ControllerContext {
  db: DataSource;
  entityManager: EntityManager;
  presignedUrlService: PresignedUrlService;
  s3Config: S3ClientConfig;
  container: AwilixContainer<AppGraphqlContext>;
  parentContainer: AwilixContainer<AppGraphqlContext>;
  transactionProvider: TransactionProvider;
  logger: Logger;
  contextName: string;
}
