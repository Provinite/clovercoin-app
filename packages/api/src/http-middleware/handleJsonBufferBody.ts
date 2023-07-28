import { Middleware } from "koa";
import { build } from "../awilix/build.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

/**
 * Middleware that converts `req.body` from a `Buffer` to a JSON
 * string, and parses it. Only runs if `content-type` is `application/json`
 *
 * This specifically is used to handle inbound API gateway calls to the
 * lambda handler, as the serverless-http library sends `req.body` as a buffer
 * for unknown reasons.
 *
 * @see https://github.com/vendia/serverless-express/issues/347
 * @param ctx Koa context
 * @param next Koa next fn
 */
export const handleJsonBufferBody: Middleware = async (ctx, next) => {
  const req = ctx.req as any;
  const { requestContainer } = ctx.state;
  if (
    Buffer.isBuffer(req.body) &&
    ctx.req.headers["content-type"] === "application/json"
  ) {
    try {
      req.body = JSON.parse(req.body.toString() || "{}");
    } catch (err) {
      ctx.status = 400;
      build(requestContainer, ({ logger }: AppGraphqlContext) =>
        logger.error({ message: "Invalid JSON in request body", status: 400 })
      );
      ctx.body = {
        error: "Invalid JSON in request body",
      };
      return;
    }
  }
  await next();
};
