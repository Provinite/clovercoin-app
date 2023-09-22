import { asValue } from "awilix";
import { isJWT } from "class-validator";
import { Middleware } from "koa";
import { build } from "../awilix/build.js";
import { register } from "../awilix/register.js";
import { JwtPayload } from "../business/LoginController.js";
import { Identity } from "../models/Identity/Identity.js";
import { verifyJwt } from "../util/jwt/verifyJwt.js";

export const setCurrentUser: Middleware = async (ctx, next) => {
  const requestContainer = ctx.state.requestContainer;
  const authHeader = ctx.headers.authorization;
  let authToken: string | null = null;
  if (authHeader && /^Bearer [a-zA-Z0-9_.-]+$/.test(authHeader)) {
    authToken = authHeader.replace("Bearer ", "");
  }
  if (authToken === null || isJWT(authToken)) {
    register(requestContainer, "authToken", asValue(authToken));
  } else {
    // TODO: Improve error handling here
    throw new Error("Invalid auth token");
  }

  if (!authToken) {
    register(requestContainer, "authTokenPayload", asValue(null));
  } else {
    try {
      const parsedToken = await verifyJwt<JwtPayload>(authToken);
      // TODO: Validate payload
      register(requestContainer, "authTokenPayload", asValue(parsedToken));
    } catch (err) {
      register(requestContainer, "authTokenPayload", asValue(null));
    }
  }

  await build(
    requestContainer,
    async ({ authTokenPayload, identityRepository }) => {
      if (authTokenPayload === null) {
        return;
      }
      const principal = await identityRepository.findOne({
        where: { id: authTokenPayload.identity.id },
        relations: {
          communityMemberships: {
            role: true,
          },
        },
      });

      register(requestContainer, "principal", asValue(principal));
    }
  );

  return next();
};

declare module "../graphql/AppGraphqlContext.js" {
  interface AppGraphqlContext {
    /** Authorization token (if present) */
    authToken: string | null;
    /** Parsed auth token */
    authTokenPayload: JwtPayload | null;
    /** Authentication principal */
    principal: Identity | null;
  }
}
