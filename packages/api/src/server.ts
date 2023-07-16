import "reflect-metadata";
import Koa, { Context, Request, Response } from "koa";
import mount from "koa-mount";
import { graphqlHTTP, OptionsResult } from "koa-graphql";
import { buildSchema, MiddlewareFn, NonEmptyArray } from "type-graphql";
import { GraphQLParams } from "express-graphql";
import cors from "@koa/cors";
import type { AppGraphqlContext } from "./graphql/AppGraphqlContext.js";
import { asClass, asFunction, asValue } from "awilix";
import { register } from "./awilix/register.js";
import { registerRepositories } from "./models/registerRepositories.js";
import { createContainer } from "./awilix/createContainer.js";
import { registerControllers } from "./business/registerControllers.js";
import { ResolversArray } from "./business/Resolvers.js";
import { logger } from "./util/logger.js";
import { configureDataSource, dataSource } from "./db/dbConnection.js";
import { DuplicateError } from "./errors/DuplicateError.js";
import { InvalidArgumentError } from "./errors/InvalidArgumentError.js";
import { print } from "graphql";
import { BaseError } from "./errors/BaseError.js";
import { PresignedUrlService } from "./s3/PresignedUrlService.js";
import { s3Config } from "./s3/s3Config.js";
import { objectMap } from "./util/objectMap.js";
import { handleJsonBufferBody } from "./http-middleware/handleJsonBufferBody.js";
import { createRequestContainer } from "./http-middleware/createRequestContainer.js";
export interface ServerOptions {
  db: {
    host?: string;
    username?: string;
    password?: string;
    port?: number;
    database?: string;
    ssl?: boolean;
  };
  schema: {
    emitFile: string | undefined;
  };
}
export const createCloverCoinAppServer = async (options: ServerOptions) => {
  if (options.db.host) {
    const result = /(.*?)(?::(\d+))?$/.exec(options.db.host);
    if (!result) {
      throw new Error("Invalid options.db.host");
    }
    const [_, host, port] = result;
    options.db.host = host;
    if (port) {
      options.db.port = Number(port);
    }
  }
  configureDataSource({
    ...options.db,
  });

  /**
   * HTTP
   */
  const koa = new Koa();

  /**
   * GraphQL
   */
  const schema = await buildSchema({
    resolvers: [...ResolversArray] as NonEmptyArray<
      typeof ResolversArray[number]
    >,
    emitSchemaFile: options?.schema.emitFile,
    globalMiddlewares: [errorHandler, loggingMiddleware],
  });

  const rootContainer = createContainer<AppGraphqlContext>("root");

  const db = await dataSource.initialize();

  /**
   * Postgres
   */
  register(rootContainer, "db", asValue(db));

  /**
   * S3
   */
  register(rootContainer, "s3Config", asFunction(s3Config));
  register(rootContainer, "presignedUrlService", asClass(PresignedUrlService));

  /**
   * Logging
   */
  register(
    rootContainer,
    "logger",
    asFunction(({ contextName }: AppGraphqlContext) =>
      logger.child({ contextName })
    ).scoped()
  );

  /**
   * TypeORM
   */
  register(
    rootContainer,
    "entityManager",
    asFunction(({ db }: AppGraphqlContext) => {
      return db.createEntityManager();
    }).scoped()
  );

  /**
   * Entity Repositories
   */
  registerRepositories(rootContainer);
  /**
   * Entity Controllers
   */
  registerControllers(rootContainer);

  koa
    .use(cors())
    .use(createRequestContainer(rootContainer))
    .use(handleJsonBufferBody)
    .use(async (ctx, next) => {
      // TODO: NO!
      await next();
      if (ctx.status === 500) {
        ctx.status = 200;
      }
    })
    .use(
      mount(
        "/",
        graphqlHTTP(
          (
            _request: Request,
            _response: Response,
            ctx: Context,
            _params?: GraphQLParams
          ): OptionsResult => {
            const { requestContainer } = ctx.state;

            return {
              schema,
              graphiql: true,
              context: requestContainer.cradle,
            };
          }
        )
      )
    );

  return { rootContainer, koa };
};

const errorHandler: MiddlewareFn<AppGraphqlContext> = async (
  { context: { logger } },
  next
) => {
  try {
    return await next();
  } catch (err) {
    logger.error(err);
    if (err instanceof BaseError) {
      return err;
    }

    const asDuplicate = DuplicateError.fromPostgresError(err);
    if (asDuplicate) {
      return asDuplicate;
    }

    const asInvalidArgError =
      InvalidArgumentError.fromTypegraphqlValidationError(err);
    if (asInvalidArgError) {
      return asInvalidArgError;
    }

    throw err;
  }
};

const loggingMiddleware: MiddlewareFn<AppGraphqlContext> = async (
  { context: { logger }, info, root },
  next
) => {
  if (!root) {
    logger.info({
      message: "Request started",
      path: print(info.operation),
      fragments: objectMap(info.fragments, print),
      fieldName: info.fieldName,
    });
  }
  return next();
};
