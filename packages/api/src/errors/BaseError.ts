import { Field, InterfaceType } from "type-graphql";

@InterfaceType({
  isAbstract: false,
})
export abstract class BaseError {
  constructor(message = "Unknown error.") {
    this.message = message;

    Object.defineProperty(this, "stack", {
      enumerable: false,
      writable: true,
    });
    this.stack = new Error().stack ?? "";
  }
  @Field(() => String)
  message!: string;

  stack: string;
}
