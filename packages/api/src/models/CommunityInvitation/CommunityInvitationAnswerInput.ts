import { IsBoolean, IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CommunityInvitationAnswerInput {
  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  id!: string;

  @Field(() => Boolean)
  @IsBoolean()
  accept!: boolean;
}
