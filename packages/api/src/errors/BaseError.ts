import { Field, InterfaceType } from "type-graphql";

@InterfaceType({
  isAbstract: true,
})
export class BaseError {
  constructor(message = "Unknown error.") {
    this.message = message;
  }
  @Field(() => String)
  message!: string;
}
