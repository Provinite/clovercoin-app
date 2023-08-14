import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class RequestPasswordResetReceivedResponse {
  @Field(() => String, { nullable: false })
  message =
    "If the email you provided matches an account, it will receive an email with next steps.";
}
