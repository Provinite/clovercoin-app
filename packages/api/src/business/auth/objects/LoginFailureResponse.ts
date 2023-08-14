import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginFailureResponse {
  @Field(() => String)
  message: string = "Invalid username or password";
}
