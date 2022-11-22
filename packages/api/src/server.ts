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
import { asFunction, asValue, Lifetime } from "awilix";
import { register } from "./awilix/register";
import { registerRepositories } from "./models/registerRepositories";
import { createContainer } from "./awilix/createContainer";
import { registerControllers } from "./business/registerControllers";
import { ResolversArray } from "./business/Resolvers";

(async function () {
  const db = await createDbConnection();

  const koa = new Koa();

  const errorHandler: MiddlewareFn<any> = async (_, next) => {
    try {
      await next();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const schema = await buildSchema({
    // eslint-disable-next-line @typescript-eslint/ban-types
    resolvers: [...ResolversArray] as unknown as NonEmptyArray<Function>,
    emitSchemaFile: "./schema.gql",
    globalMiddlewares: [errorHandler],
  });

  const rootContainer = createContainer<AppGraphqlContext>();
  register(rootContainer, "db", asValue(db));
  register(
    rootContainer,
    "entityManager",
    asFunction(
      ({ db }: AppGraphqlContext) => {
        return db.createEntityManager();
      },
      { lifetime: Lifetime.SINGLETON }
    )
  );
  registerRepositories(rootContainer);
  registerControllers(rootContainer);

  koa.use(cors()).use(
    mount(
      "/",
      graphqlHTTP(
        (
          _request: Request,
          _response: Response,
          _ctx: Context,
          _params?: GraphQLParams
        ): OptionsResult => {
          const requestContainer = rootContainer.createScope();
          register(
            requestContainer,
            "_tgdContext",
            asValue({
              requestId: v4(),
              typeormGetConnection: () => requestContainer.cradle.db,
            })
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

  koa.listen(3000);
})();
