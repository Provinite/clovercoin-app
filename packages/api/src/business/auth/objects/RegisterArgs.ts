import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsValidInviteCode } from "../../validation/IsValidInviteCode.js";
import { IsValidPassword } from "../../validation/IsValidPassword.js";

@InputType()
export class RegisterArgs {
  @Field(() => String)
  @MinLength(1)
  username: string = "";

  @Field(() => String)
  @IsValidPassword()
  password: string = "";

  @Field(() => String, { nullable: false })
  @IsEmail({
    allow_display_name: false,
    allow_ip_domain: true,
    require_tld: true,
  })
  email!: string;

  @Field(() => String, { nullable: false })
  @IsValidInviteCode()
  inviteCodeId!: string;
}
