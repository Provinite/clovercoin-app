import { ObjectType } from "type-graphql";
import { BaseError } from "../../errors/BaseError.js";

@ObjectType({
  implements: BaseError,
})
export class UserAlreadyHasRoleError extends BaseError {
  constructor() {
    super("Cannot invite user, they already have the specified role");
  }
}
