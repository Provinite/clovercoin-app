import { asFunction, asValue, AwilixContainer } from "awilix";
import { Middleware } from "koa";
import { Connection } from "typeorm/connection/Connection.js";
import { v4 } from "uuid";
import { build } from "../awilix/build.js";
import { createChildContainer } from "../awilix/createChildContainer.js";
import { register } from "../awilix/register.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

/**
 * Creates a DI container for each request,containing useful request-scoped
 * goodies. The created container is placed in `ctx.state.requestContainer`
 * @param rootContainer The root DI container to use to create child containers
 * @returns
 */
export const createRequestContainer =
  (rootContainer: AwilixContainer<AppGraphqlContext>): Middleware =>
  async (ctx, next) => {
    const requestId = v4();

    const requestContainer = createChildContainer(
      rootContainer,
      `request.${requestId}`
    );

    register(requestContainer, "requestId", asValue(requestId));

    /**
     * Typegraphql Data Loader (tgd) required context.
     */
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
        ({ requestId, parentContainer, contextName }: AppGraphqlContext) =>
          build(parentContainer, ({ logger }) =>
            logger.child({ requestId, contextName })
          )
      ).scoped()
    );

    ctx.state.requestContainer = requestContainer;

    await next();
  };

declare module "koa" {
  interface DefaultState {
    /** Request-scoped DI container */
    requestContainer: AwilixContainer<AppGraphqlContext>;
  }
}

declare module "../graphql/AppGraphqlContext.js" {
  interface AppGraphqlContext {
    _tgdContext: {
      requestId: string;
      typeormGetConnection: () => Connection;
    };
    /** HTTP request uuid */
    requestId: string;
  }
}
