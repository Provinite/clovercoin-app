import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
export abstract class BaseError extends Error {
  constructor(message = "Unknown error.") {
    super(message);
    this.message = message;

    Object.defineProperty(this, "stack", {
      enumerable: true,
      writable: true,
    });
    this.stack = new Error().stack ?? "";
  }
  @Field(() => String)
  message!: string;

  stack: string;
}
