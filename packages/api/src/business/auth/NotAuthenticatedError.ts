import { ObjectType } from "type-graphql";
import { BaseError } from "../../errors/BaseError.js";

@ObjectType({
  implements: BaseError,
  description:
    "This error indicates that the associated field requires authentication and no valid authentication was provided.",
})
export class NotAuthenticatedError extends BaseError {
  constructor() {
    super("Not authenticated");
  }
}
