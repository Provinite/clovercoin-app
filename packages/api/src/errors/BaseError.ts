import { Field, InterfaceType } from "type-graphql";

@InterfaceType({
  isAbstract: false,
})
export abstract class BaseError {
  constructor(message = "Unknown error.") {
    this.message = message;
  }
  @Field(() => String)
  message!: string;
}
