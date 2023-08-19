import {
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
  ArrayMinSize,
  MinLength,
} from "class-validator";
import { InputType, Field, ID } from "type-graphql";
import { CritterTraitValueTypes } from "../../CritterTrait/CritterTraitValueTypes.js";
import { TraitCreateEnumValueInput } from "./TraitCreateEnumValueInput.js";

@InputType()
export class TraitCreateInput {
  @Field()
  @MinLength(2)
  name!: string;

  @Field(() => CritterTraitValueTypes)
  @IsEnum(CritterTraitValueTypes)
  valueType!: CritterTraitValueTypes;

  @Field(() => [TraitCreateEnumValueInput])
  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested()
  enumValues?: TraitCreateEnumValueInput[];

  @Field(() => ID)
  @IsUUID(4)
  speciesId!: string;
}
