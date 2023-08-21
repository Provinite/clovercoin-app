import { MiddlewareFn } from "type-graphql";
import { AppGraphqlContext } from "../AppGraphqlContext.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { BaseError } from "../../errors/BaseError.js";

export const errorHandlerMiddleware: MiddlewareFn<AppGraphqlContext> = async (
  { context: { logger } },
  next
) => {
  try {
    return await next();
  } catch (err) {
    logger.error(err);
    if (err instanceof BaseError) {
      return err;
    }

    const asDuplicate = DuplicateError.fromPostgresError(err);
    if (asDuplicate) {
      return asDuplicate;
    }

    const asInvalidArgError =
      InvalidArgumentError.fromTypegraphqlValidationError(err);
    if (asInvalidArgError) {
      return asInvalidArgError;
    }

    throw err;
  }
};
