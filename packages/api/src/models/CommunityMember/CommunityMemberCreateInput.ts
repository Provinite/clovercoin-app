import { IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CommunityMemberCreateInput {
  @Field(() => ID)
  @IsUUID(4)
  roleId!: string;

  @Field(() => ID)
  @IsUUID(4)
  identityId!: string;
}
