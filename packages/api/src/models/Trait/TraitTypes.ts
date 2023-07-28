import {
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
  Validate,
  ArrayMinSize,
  IsNumber,
  Min,
  MinLength,
} from "class-validator";
import { InputType, Field, ID, createUnionType } from "type-graphql";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes.js";
import { Trait } from "./Trait.js";
import { TraitEnumOptionsLength } from "./TraitValidators.js";

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

export const TraitCreateResponse = createUnionType({
  name: "TraitCreateResponse",
  types: () => [Trait, DuplicateError, InvalidArgumentError],
});

export const TraitModifyResponse = createUnionType({
  name: "TraitModifyResponse",
  types: () => [Trait, DuplicateError, InvalidArgumentError],
});

@InputType()
export class TraitFilters {
  @Field(() => ID, {
    nullable: false,
  })
  @IsUUID(4)
  speciesId!: string;
}
