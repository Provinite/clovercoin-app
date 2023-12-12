import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ResetPasswordSuccessResponse {
  @Field(() => Boolean, { nullable: false })
  success: boolean = true;
}
