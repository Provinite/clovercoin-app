import { IsUUID } from "class-validator";
import { createUnionType, Field, ID, InputType } from "type-graphql";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { DeleteResponse } from "../../business/DeleteResponse.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
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
  speciesVariantId!: string;
}

export const EnumValueSettingCreateResponse = createUnionType({
  name: "enumValueSettingCreateResponse",
  types: () => [
    EnumValueSetting,
    DuplicateError,
    InvalidArgumentError,
    NotFoundError,
    NotAuthenticatedError,
    NotAuthorizedError,
  ],
});

export const EnumValueSettingDeleteResponse = createUnionType({
  name: "EnumValueSettingDeleteResponse",
  types: () => [
    DeleteResponse,
    InvalidArgumentError,
    NotFoundError,
    NotAuthorizedError,
    NotAuthenticatedError,
  ],
});
