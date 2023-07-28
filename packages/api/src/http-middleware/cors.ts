import { Middleware } from "koa";

export const cors: Middleware = async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.get("Origin"));
  ctx.set("Access-Control-Allow-Methods", ["POST"]);
  ctx.set("Access-Control-Allow-Headers", ["Content-Type", "Origin"]);
  ctx.status = 200;
  if (ctx.method !== "OPTIONS") {
    return next();
  }
};
