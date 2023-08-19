import { ObjectType } from "type-graphql";
import { BaseError } from "../../errors/BaseError.js";

@ObjectType({ implements: BaseError })
export class NotAuthorizedError extends BaseError {
  constructor() {
    super("Not authorized");
  }
}
