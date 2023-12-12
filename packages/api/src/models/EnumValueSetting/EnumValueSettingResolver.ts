import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AuthScope } from "../../business/auth/AuthInfo.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { DeleteResponse } from "../../business/DeleteResponse.js";
import { parseArgToClass } from "../../business/validation/parseArgToClass.js";
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
  @Preauthorize(
    async ({
      args: { input },
      context: {
        enumValueSettingController,
        speciesVariantController,
        speciesController,
      },
    }) => {
      const { id } = await parseArgToClass(input, EnumValueDeleteInput);
      const enumValueSetting =
        await enumValueSettingController.findOneByIdOrFail(id);
      const speciesVariant = await speciesVariantController.findOneByIdOrFail(
        enumValueSetting.speciesVariantId
      );
      const species = await speciesController.findOneByIdOrFail(
        speciesVariant.speciesId
      );

      return {
        scope: AuthScope.Community,
        communityId: species.communityId,
        permissions: ["canEditSpecies"],
      };
    }
  )
  async deleteEnumValueSetting(
    @Arg("input") input: EnumValueDeleteInput,
    @Ctx() { enumValueSettingController }: AppGraphqlContext
  ) {
    await enumValueSettingController.deleteOneById(input.id);
    return new DeleteResponse(true);
  }

  @Mutation(() => EnumValueSettingCreateResponse)
  @Preauthorize(
    async ({
      args: { input },
      context: { speciesVariantController, speciesController },
    }) => {
      const { speciesVariantId } = await parseArgToClass(
        input,
        EnumValueSettingCreateInput
      );
      const speciesVariant = await speciesVariantController.findOneByIdOrFail(
        speciesVariantId
      );
      const species = await speciesController.findOneByIdOrFail(
        speciesVariant.speciesId
      );

      return {
        scope: AuthScope.Community,
        communityId: species.communityId,
        permissions: ["canEditSpecies"],
      };
    }
  )
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
