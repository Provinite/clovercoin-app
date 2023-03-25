import {
  isBoolean,
  IsBoolean,
  IsInt,
  isNumber,
  IsUUID,
  Min,
  ValidateIf,
} from "class-validator";
import { createUnionType, Field, ID, InputType, Int } from "type-graphql";
import { DeleteResponse } from "../../business/DeleteResponse";
import { DuplicateError } from "../../errors/DuplicateError";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError";
import { isNullish } from "../../util/isNullish";
import { TraitListEntry } from "./TraitListEntry";

/**
 * Input type for createTraitListEntry mutations.
 */
@InputType({
  description: "Input object for creating a new TraitListEntry",
})
export class TraitListEntryCreateInput {
  @Field(() => ID)
  @IsUUID(4)
  traitListId!: string;

  @Field(() => ID)
  @IsUUID(4)
  traitId!: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  order!: number;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  required: boolean = false;
}

/**
 * Input type for createTraitListEntry mutations.
 */
@InputType({
  description: "Input object for modifying a TraitListEntry",
})
export class TraitListEntryModifyInput {
  @Field(() => ID)
  @IsUUID(4)
  id!: string;

  @Field(() => Int, { nullable: true })
  @ValidateIf(
    (v: TraitListEntryModifyInput) => isNumber(v.order) && isNullish(v.required)
  )
  @IsInt()
  @Min(0)
  order?: number;

  @Field(() => Boolean, { nullable: true })
  @ValidateIf(
    ({ required, order }: TraitListEntryModifyInput) =>
      isBoolean(required) || isNullish(order)
  )
  @IsBoolean()
  required?: boolean;
}

/**
 * Response type for createTraitListEntry mutations.
 */
export const TraitListEntryCreateResponse = createUnionType({
  name: "TraitListEntryCreateResponse",
  types: () => [TraitListEntry, DuplicateError, InvalidArgumentError],
});

/**
 * Response type for createTraitListEntry mutations.
 */
export const TraitListEntryModifyResponse = createUnionType({
  name: "TraitListEntryModifyResponse",
  types: () => [TraitListEntry, InvalidArgumentError],
});

export const TraitListEntryDeleteResponse = createUnionType({
  name: "TraitListEntryDeleteResponse",
  types: () => [DeleteResponse, InvalidArgumentError],
});
