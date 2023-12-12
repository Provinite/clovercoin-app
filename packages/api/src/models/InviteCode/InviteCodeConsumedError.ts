import { ObjectType } from "type-graphql";
import { BaseError } from "../../errors/BaseError.js";

@ObjectType({ implements: () => [BaseError] })
export class InviteCodeExhaustedError extends BaseError {
  constructor() {
    super("This invite code has been exhausted.");
  }
}
