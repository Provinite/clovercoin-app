import "reflect-metadata";
import Koa from "koa";
import mount from "koa-mount";
import { graphqlHTTP, OptionsResult } from "koa-graphql";
import { buildSchema, NonEmptyArray } from "type-graphql";
import type { AppGraphqlContext } from "./graphql/AppGraphqlContext.js";
import { asClass, asFunction, asValue } from "awilix";
import { register } from "./awilix/register.js";
import { registerRepositories } from "./models/registerRepositories.js";
import { createContainer } from "./awilix/createContainer.js";
import { registerControllers } from "./business/registerControllers.js";
import { ResolversArray } from "./business/Resolvers.js";
import { logger } from "./util/logger.js";
import { configureDataSource, dataSource } from "./db/dbConnection.js";
import { PresignedUrlService } from "./s3/PresignedUrlService.js";
import { s3Config } from "./s3/s3Config.js";
import { handleJsonBufferBody } from "./http-middleware/handleJsonBufferBody.js";
import { createRequestContainer } from "./http-middleware/createRequestContainer.js";
import { build } from "./awilix/build.js";
import { cors } from "./http-middleware/cors.js";
import {
  getAppEnvironment,
  getBootstrapEnvironment,
  getS3Environment,
  getSesEnvironment,
} from "./environment.js";
import { ImageController } from "./business/ImageController.js";
import { sesConfig } from "./ses/sesConfig.js";
import { errorHandlerMiddleware } from "./graphql/middlewares/errorHandlerMiddleware.js";
import { loggingMiddleware } from "./graphql/middlewares/loggingMiddleware.js";
import { setCurrentUser } from "./http-middleware/setCurrentUser.js";
import { AuthorizerRegistry } from "./business/auth/AuthorizerRegistry.js";
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
    globalMiddlewares: [errorHandlerMiddleware, loggingMiddleware],
  });

  const rootContainer = createContainer<AppGraphqlContext>("root");

  const db = await dataSource.initialize();

  /**
   * General app environment
   */
  register(rootContainer, "appEnvironment", asValue(getAppEnvironment()));
  /**
   * Postgres
   */
  register(rootContainer, "db", asValue(db));

  register(
    rootContainer,
    "bootstrapEnvironment",
    asFunction(getBootstrapEnvironment)
  );

  /**
   * S3
   */
  register(rootContainer, "presignedUrlService", asClass(PresignedUrlService));
  register(rootContainer, "s3Environment", asFunction(getS3Environment));
  register(rootContainer, "s3Config", asValue(build(rootContainer, s3Config)));
  register(rootContainer, "imageController", asClass(ImageController));

  /**
   * SES
   */
  register(
    rootContainer,
    "sesEnvironment",
    asValue(build(rootContainer, getSesEnvironment))
  );
  register(rootContainer, "sesConfig", asFunction(sesConfig));
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

  /**
   * Authorizer registry
   */
  register(
    rootContainer,
    "authorizerRegistry",
    asClass(AuthorizerRegistry).scoped()
  );
  koa
    .use(cors)
    .use(createRequestContainer(rootContainer))
    .use(setCurrentUser)
    .use(handleJsonBufferBody)
    .use(async (ctx, next) => {
      await next();
      build(ctx.state.requestContainer, ({ logger }) => {
        logger.info({
          message: "request finished",
          path: ctx.path,
          method: ctx.method,
          responseStatus: ctx.status,
        });
      });
    })
    .use(
      mount(
        "/",
        graphqlHTTP((_request, _response, ctx, _params?): OptionsResult => {
          const { requestContainer } = ctx.state;

          return {
            schema,
            graphiql: {
              headerEditorEnabled: true,
              shouldPersistHeaders: true,
            },
            context: requestContainer.cradle,
          };
        })
      )
    );

  return { rootContainer, koa };
};

declare module "./graphql/AppGraphqlContext.js" {
  export interface AppGraphqlContext {
    s3Environment: ReturnType<typeof getS3Environment>;
    bootstrapEnvironment: ReturnType<typeof getBootstrapEnvironment>;
    imageController: ImageController;
    sesEnvironment: ReturnType<typeof getSesEnvironment>;
    sesConfig: ReturnType<typeof sesConfig>;
    appEnvironment: ReturnType<typeof getAppEnvironment>;
    authorizerRegistry: AuthorizerRegistry;
  }
}
