import "reflect-metadata";
import Koa, { Context, Request, Response } from "koa";
import mount from "koa-mount";
import { graphqlHTTP, OptionsResult } from "koa-graphql";
import { buildSchemaSync, MiddlewareFn, NonEmptyArray } from "type-graphql";
import { GraphQLParams } from "express-graphql";
import { v4 } from "uuid";
import cors from "@koa/cors";
import type { AppGraphqlContext } from "./graphql/AppGraphqlContext.js";
import { asClass, asFunction, asValue } from "awilix";
import { register } from "./awilix/register.js";
import { registerRepositories } from "./models/registerRepositories.js";
import { createContainer } from "./awilix/createContainer.js";
import { registerControllers } from "./business/registerControllers.js";
import { ResolversArray } from "./business/Resolvers.js";
import { logger } from "./util/logger.js";
import { createChildContainer } from "./awilix/createChildContainer.js";
import { configureDataSource, dataSource } from "./db/dbConnection.js";
import { DuplicateError } from "./errors/DuplicateError.js";
import { InvalidArgumentError } from "./errors/InvalidArgumentError.js";
import { print } from "graphql";
import { BaseError } from "./errors/BaseError.js";
import { PresignedUrlService } from "./s3/PresignedUrlService.js";
import { s3Config } from "./s3/s3Config.js";
import { objectMap } from "./util/objectMap.js";
export interface ServerOptions {
  db: {
    host?: string;
    username?: string;
    password?: string;
    port?: number;
    database?: string;
  };
  schema: {
    emitFile: string | undefined;
  };
}
export const createCloverCoinAppServer = (options: ServerOptions) => {
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
    ssl: false,
  });

  const ready = new Promise<void>((res, rej) => {
    /**
     * We do asynchronous setup in here so that we can still
     * synchronously make the server available (eg for serverless
     * requests). This promise is awaited before processing any requests,
     * that combined with lazy initialization of the graphql context entries
     * allows for a (somewhat percarious) situation where we can get HTTP calls
     * before the server is strictly ready.
     */
    dataSource.initialize().then((db) => {
      /**
       * Postgres
       */
      register(rootContainer, "db", asValue(db));
      res();
    }, rej);
  });

  /**
   * HTTP
   */
  const koa = new Koa();

  /**
   * GraphQL
   */
  const schema = buildSchemaSync({
    resolvers: [...ResolversArray] as NonEmptyArray<
      typeof ResolversArray[number]
    >,
    emitSchemaFile: options?.schema.emitFile,
    globalMiddlewares: [errorHandler, loggingMiddleware],
  });

  const rootContainer = createContainer<AppGraphqlContext>("root");
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
    asFunction(({ contextName }) => logger.child({ contextName })).scoped()
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
    .use(async (ctx, next) => {
      const req = ctx.req as any;
      if (
        Buffer.isBuffer(req.body) &&
        ctx.req.headers["content-type"] === "application/json"
      ) {
        req.body = JSON.parse(req.body.toString());
      }
      await ready;
      logger.info({
        message: {
          path: ctx.path,
        },
      });
      await next();
    })
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
            _ctx: Context,
            _params?: GraphQLParams
          ): OptionsResult => {
            const requestId = v4();

            const requestContainer = createChildContainer(
              rootContainer,
              `request.${requestId}`
            );

            register(requestContainer, "requestId", asValue(requestId));
            register(
              requestContainer,
              "_tgdContext",
              asValue({
                requestId,
                typeormGetConnection: () => requestContainer.cradle.db,
              })
            );

            register(
              requestContainer,
              "logger",
              asFunction(
                ({
                  requestId,
                  parentContainer,
                  contextName,
                }: AppGraphqlContext) =>
                  parentContainer.build(({ logger }) =>
                    logger.child({ requestId, contextName })
                  )
              ).scoped()
            );

            return {
              schema,
              graphiql: true,
              context: requestContainer.cradle,
            };
          }
        )
      )
    );

  return { rootContainer, koa, ready };
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
