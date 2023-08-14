import { IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";
import { IsValidPassword } from "../../validation/IsValidPassword.js";

@InputType()
export class ResetPasswordInput {
  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  token!: string;

  @Field(() => String, { nullable: false })
  @IsValidPassword()
  password!: string;
}
