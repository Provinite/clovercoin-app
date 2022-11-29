import "reflect-metadata";
import Koa, { Context, Request, Response } from "koa";
import mount from "koa-mount";
import { graphqlHTTP, OptionsResult } from "koa-graphql";
import { buildSchema, MiddlewareFn, NonEmptyArray } from "type-graphql";
import { createDbConnection } from "./db/dbConnection";
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
import { GraphQLError, print } from "graphql";
import { QueryFailedError } from "typeorm";
(async () => {
  const db = await createDbConnection();

  const koa = new Koa();

  const errorHandler: MiddlewareFn<AppGraphqlContext> = async (
    { context: { logger } },
    next
  ) => {
    try {
      return await next();
    } catch (err) {
      logger.error(err);

      throw err;
    }
  };

  const loggingMiddleware: MiddlewareFn<AppGraphqlContext> = async (
    { context: { logger }, info, root },
    next
  ) => {
    if (root === undefined) {
      logger.info({
        message: "Request started",
        path: print(info.operation),
        fieldName: info.fieldName,
      });
    }
    return next();
  };
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
              customFormatErrorFn(err: GraphQLError) {
                if (err.originalError instanceof QueryFailedError) {
                  if (
                    err.originalError?.driverError?.code?.toString() === "23505"
                  ) {
                    // DUPLICATE KEY
                    const pattern = /\((?<field>.*?)\)=\((?<value>.*?)\)/g;
                    const errorDetail: string =
                      err.originalError.driverError.detail ?? "";

                    const messages: string[] = [];
                    for (const match of errorDetail.matchAll(pattern)) {
                      const { field } = match.groups!;
                      messages.push(`${field}`);
                    }
                    err.message = `Duplicate ${messages.join(", ")}`;
                  }
                }
                return err;
              },
            };
          }
        )
      )
    );

  koa.listen(3000);

  rootContainer.build(({ logger }) =>
    logger.info({
      message: "Server Started",
      port: 3000,
    })
  );
})();
