import { ObjectType } from "type-graphql";
import { BaseError } from "../../errors/BaseError.js";

@ObjectType({
  implements: BaseError,
  description:
    "This error indicates the associated field requires permissions that the requestor does not posess.",
})
export class NotAuthorizedError extends BaseError {
  constructor() {
    super("Insufficient permissions");
  }
}
