import { IsEmail, IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CommunityInvitationCreateInput {
  @Field(() => ID)
  @IsUUID(4)
  roleId!: string;

  @Field(() => String)
  @IsEmail({
    allow_display_name: false,
    allow_ip_domain: true,
    require_tld: true,
  })
  emailAddress!: string;
}
