import { Middleware } from "koa";

export const cors: Middleware = async (ctx, next) => {
  if (ctx.method === "OPTIONS") {
    ctx.set("Access-Control-Allow-Origin", ctx.get("Origin"));
    ctx.set("Access-Control-Allow-Methods", ["POST"]);
    ctx.status = 200;
  } else {
    return next();
  }
};
