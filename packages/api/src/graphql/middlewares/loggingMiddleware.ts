import { MiddlewareFn } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { print } from "graphql";
import { objectMap } from "../../util/objectMap.js";

export const loggingMiddleware: MiddlewareFn<AppGraphqlContext> = async (
  { context: { logger }, info, root },
  next
) => {
  if (!root) {
    logger.info({
      message: "Request started",
      path: print(info.operation),
      fragments: objectMap(info.fragments, print),
      fieldName: info.fieldName,
    });
  }
  await next();
};
