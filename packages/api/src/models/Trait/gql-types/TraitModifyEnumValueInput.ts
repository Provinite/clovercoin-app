import { IsOptional, IsUUID, Min, MinLength } from "class-validator";
import { InputType, Field, ID } from "type-graphql";

@InputType()
export class TraitModifyEnumValueInput {
  @Field(() => ID, {
    nullable: true,
    defaultValue: null,
  })
  @IsUUID(4)
  @IsOptional()
  id?: string;

  @Field()
  @MinLength(2)
  name!: string;

  @Field()
  @Min(0)
  order!: number;
}
