import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RequestPasswordResetInput {
  @Field(() => String, { nullable: false })
  @IsEmail({
    allow_display_name: false,
    allow_ip_domain: true,
    require_tld: true,
  })
  email!: string;
}
