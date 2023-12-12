import {
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
  Validate,
} from "class-validator";
import { InputType, Field, ID } from "type-graphql";
import { CritterTraitValueTypes } from "../../CritterTrait/CritterTraitValueTypes.js";
import { TraitModifyEnumValueInput } from "./TraitModifyEnumValueInput.js";
import { TraitEnumOptionsLength } from "../TraitValidators.js";

@InputType()
export class TraitModifyInput {
  @Field()
  name?: string;

  @Field(() => CritterTraitValueTypes)
  @IsEnum(CritterTraitValueTypes)
  valueType!: CritterTraitValueTypes;

  @Field(() => [TraitModifyEnumValueInput], {
    nullable: true,
    defaultValue: null,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Validate(TraitEnumOptionsLength)
  enumValues?: TraitModifyEnumValueInput[];

  @Field(() => ID)
  @IsUUID(4)
  id!: string;
}
