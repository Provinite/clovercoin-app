import { IsUUID } from "class-validator";
import { createUnionType, Field, ID, InputType } from "type-graphql";
import { DeleteResponse } from "../../business/DeleteResponse.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { EnumValueSetting } from "./EnumValueSetting.js";

@InputType()
export class EnumValueDeleteInput {
  @Field(() => ID)
  @IsUUID()
  id!: string;
}

@InputType()
export class EnumValueSettingCreateInput {
  @Field(() => ID)
  @IsUUID()
  enumValueId!: string;

  @Field(() => ID)
  @IsUUID()
  traitListId!: string;
}

export const EnumValueSettingCreateResponse = createUnionType({
  name: "enumValueSettingCreateResponse",
  types: () => [EnumValueSetting, DuplicateError, InvalidArgumentError],
});

export const EnumValueSettingDeleteResponse = createUnionType({
  name: "EnumValueSettingDeleteResponse",
  types: () => [DeleteResponse, InvalidArgumentError],
});
