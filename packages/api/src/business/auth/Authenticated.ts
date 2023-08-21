import { createMethodDecorator } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { authChecker } from "./authChecker.js";
import { NotAuthorizedError } from "./NotAuthorizedError.js";

export const Authenticated = () =>
  createMethodDecorator<AppGraphqlContext>(async (arg, next) => {
    if (!(await authChecker(arg, []))) {
      throw new NotAuthorizedError();
    }
    return next();
  });
