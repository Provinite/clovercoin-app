import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginArgs {
  @Field(() => String)
  @MinLength(1)
  username: string = "";

  @Field(() => String)
  @MinLength(1)
  password: string = "";
}
