import { ObjectType } from "type-graphql";
import { BaseError } from "../../errors/BaseError.js";

@ObjectType({
  implements: BaseError,
})
export class InvitationRequiredError extends BaseError {
  constructor() {
    super("An invitation is required to add a new user to your community.");
  }
}
