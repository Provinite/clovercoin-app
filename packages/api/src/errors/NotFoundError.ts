import { ObjectType } from "type-graphql";
import { BaseError } from "./BaseError.js";

@ObjectType({ implements: BaseError })
export class NotFoundError extends BaseError {
  constructor() {
    super("Entity not found");
  }
}
