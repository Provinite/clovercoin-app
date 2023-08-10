import { asFunction, asValue, AwilixContainer } from "awilix";
import { isJWT } from "class-validator";
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

    const authHeader = ctx.headers.authorization;
    let authToken: string | null = null;
    if (authHeader && /^Bearer [a-zA-Z0-9_.-]+$/.test(authHeader)) {
      authToken = authHeader.replace("Bearer ", "");
    }
    if (authToken === null || isJWT(authToken)) {
      register(requestContainer, "authToken", asValue(authToken));
    } else {
      throw new Error("Invalid auth token");
    }

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
  /**
   * This shouldn't be used for anything really, and is here only to
   * configure
   */
  interface AppGraphqlContext {
    _tgdContext: {
      requestId: string;
      typeormGetConnection: () => Connection;
    };
    /** HTTP request uuid */
    requestId: string;
    /** Authorization token (if present) */
    authToken: string | null;
  }
}
