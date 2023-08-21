import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { DeleteResponse } from "../../business/DeleteResponse.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { EnumValueSetting } from "./EnumValueSetting.js";
import {
  EnumValueDeleteInput,
  EnumValueSettingCreateInput,
  EnumValueSettingCreateResponse,
  EnumValueSettingDeleteResponse,
} from "./EnumValueSettingType.js";

@Resolver(() => EnumValueSetting)
export class EnumValueSettingResolver {
  @Mutation(() => EnumValueSettingDeleteResponse)
  async deleteEnumValueSetting(
    @Arg("input") input: EnumValueDeleteInput,
    @Ctx() { enumValueSettingController }: AppGraphqlContext
  ) {
    await enumValueSettingController.deleteOneById(input.id);
    return new DeleteResponse(true);
  }

  @Mutation(() => EnumValueSettingCreateResponse)
  async createEnumValueSetting(
    @Arg("input") input: EnumValueSettingCreateInput,
    @Ctx() { enumValueSettingController }: AppGraphqlContext
  ) {
    return enumValueSettingController.create({
      enumValueId: input.enumValueId,
      speciesVariantId: input.speciesVariantId,
    });
  }
}
