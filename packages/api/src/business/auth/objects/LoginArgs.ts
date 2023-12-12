import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginArgs {
  @Field(() => String)
  @IsEmail({
    allow_display_name: false,
    allow_ip_domain: true,
    require_tld: true,
  })
  email: string = "";

  @Field(() => String)
  @MinLength(1)
  password: string = "";
}
