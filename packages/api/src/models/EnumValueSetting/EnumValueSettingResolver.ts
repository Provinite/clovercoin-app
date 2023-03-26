import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { DeleteResponse } from "../../business/DeleteResponse";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { EnumValueSetting } from "./EnumValueSetting";
import {
  EnumValueDeleteInput,
  EnumValueSettingCreateInput,
  EnumValueSettingCreateResponse,
  EnumValueSettingDeleteResponse,
} from "./EnumValueSettingType";

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
      traitListId: input.traitListId,
    });
  }
}
