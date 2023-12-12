import { IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class TraitDeleteInput {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  id!: string;
}
