import { IsUUID } from "class-validator";
import { InputType, Field, ID } from "type-graphql";

@InputType()
export class TraitFilters {
  @Field(() => ID, {
    nullable: false,
  })
  @IsUUID(4)
  speciesId!: string;
}
