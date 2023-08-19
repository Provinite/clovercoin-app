import { IsNumber, Min, MinLength } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class TraitCreateEnumValueInput {
  @Field()
  @MinLength(2)
  name!: string;

  @Field()
  @Min(0)
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  order!: number;
}
