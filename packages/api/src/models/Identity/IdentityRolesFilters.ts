import { IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class IdentityRolesFilters {
  @Field(() => ID)
  @IsUUID(4)
  communityId!: string;
}
