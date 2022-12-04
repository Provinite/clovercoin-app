import "reflect-metadata";
import Koa, { Context, Request, Response } from "koa";
import mount from "koa-mount";
import { graphqlHTTP, OptionsResult } from "koa-graphql";
import { buildSchema, MiddlewareFn, NonEmptyArray } from "type-graphql";
import { GraphQLParams } from "express-graphql";
import { v4 } from "uuid";
import cors from "@koa/cors";
import { AppGraphqlContext } from "./graphql/AppGraphqlContext";
import { asFunction, asValue } from "awilix";
import { register } from "./awilix/register";
import { registerRepositories } from "./models/registerRepositories";
import { createContainer } from "./awilix/createContainer";
import { registerControllers } from "./business/registerControllers";
import { ResolversArray } from "./business/Resolvers";
import { logger } from "./util/logger";
import { createChildContainer } from "./awilix/createChildContainer";
import { dataSource } from "./db/dbConnection";
import { DuplicateError } from "./errors/DuplicateError";
import { InvalidArgumentError } from "./errors/InvalidArgumentError";
import { print } from "graphql";
import { BaseError } from "./errors/BaseError";
export const createCloverCoinAppServer = async () => {
  const db = await dataSource.initialize();

  const koa = new Koa();

  const schema = await buildSchema({
    resolvers: [...ResolversArray] as NonEmptyArray<
      typeof ResolversArray[number]
    >,
    emitSchemaFile: "./schema.gql",
    globalMiddlewares: [errorHandler, loggingMiddleware],
  });

  const rootContainer = createContainer<AppGraphqlContext>("root");
  register(rootContainer, "db", asValue(db));

  register(
    rootContainer,
    "entityManager",
    asFunction(({ db }: AppGraphqlContext) => {
      return db.createEntityManager();
    }).scoped()
  );

  register(
    rootContainer,
    "logger",
    asFunction(({ contextName }) => logger.child({ contextName })).scoped()
  );

  registerRepositories(rootContainer);
  registerControllers(rootContainer);

  koa
    .use(cors())
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
      fieldName: info.fieldName,
    });
  }
  return next();
};
