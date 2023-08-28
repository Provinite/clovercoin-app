import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes.js";
import { EnumValueCreate } from "../EnumValue/EnumValueController.js";
import { Trait } from "./Trait.js";
import { TraitCreate } from "./TraitController.js";
import { TraitModifyInput } from "./gql-types/TraitModifyInput.js";
import { TraitCreateInput } from "./gql-types/TraitCreateInput.js";
import { TraitCreateResponse } from "./gql-types/TraitCreateResponse.js";
import { TraitModifyResponse } from "./gql-types/TraitModifyResponse.js";
import { TraitFilters } from "./gql-types/TraitFilters.js";
import { TraitListResponse } from "./gql-types/TraitListResponse.js";
import { TraitList } from "./gql-types/TraitList.js";
import { TraitDeleteResponse } from "./gql-types/TraitDeleteResponse.js";
import { DeleteResponse } from "../../business/DeleteResponse.js";
import { TraitDeleteInput } from "./gql-types/TraitDeleteInput.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { AuthScope } from "../../business/auth/AuthInfo.js";
import { parseArgToClass } from "../../business/validation/parseArgToClass.js";

@Resolver(() => Trait)
export class TraitResolver {
  @Preauthorize(async ({ context: { speciesController }, args: { input } }) => {
    const traitCreateInput = await parseArgToClass(input, TraitCreateInput);
    const species = await speciesController.findOneByIdOrFail(
      traitCreateInput.speciesId
    );
    return {
      scope: AuthScope.Community,
      communityId: species.communityId,
      permissions: ["canEditSpecies"],
    };
  })
  @Mutation(() => TraitCreateResponse)
  async createTrait(
    @Arg("input") input: TraitCreateInput,
    @Ctx() { transactionProvider }: AppGraphqlContext
  ): Promise<Trait> {
    return await transactionProvider.runTransaction(
      async ({ traitController, enumValueController }) => {
        const traitCreateBody: TraitCreate = {
          name: input.name,
          valueType: input.valueType,
          speciesId: input.speciesId,
        };
        const trait: Trait = await traitController.create(traitCreateBody);

        const enumValueCreateBodies: EnumValueCreate[] = [];

        if (
          input.valueType === CritterTraitValueTypes.Enum &&
          input.enumValues?.length
        ) {
          for (const enumValue of input.enumValues) {
            enumValueCreateBodies.push({
              name: enumValue.name,
              trait,
              order: enumValue.order,
            });
          }
          await Promise.all(
            enumValueCreateBodies.map((createBody) =>
              enumValueController.create(createBody)
            )
          );
        }

        return trait;
      }
    );
  }

  @Query(() => TraitListResponse)
  @Preauthorize(async ({ args: { input }, context: { speciesController } }) => {
    const { speciesId } = await parseArgToClass(input, TraitFilters);
    const species = await speciesController.findOneByIdOrFail(speciesId);
    return {
      scope: AuthScope.Community,
      communityId: species.communityId,
      permissions: [],
    };
  })
  async traits(
    @Arg("filters", () => TraitFilters) filters: TraitFilters,
    @Ctx() { traitRepository }: AppGraphqlContext
  ): Promise<TraitList> {
    const result = await traitRepository.find({
      where: {
        speciesId: filters.speciesId,
      },
    });
    return new TraitList(result);
  }

  @Mutation(() => TraitDeleteResponse)
  @Preauthorize(
    async ({
      args: { input },
      context: { traitController, speciesController },
    }) => {
      const { id } = await parseArgToClass(input, TraitDeleteInput);
      const trait = await traitController.findOneByIdOrFail(id);
      const species = await speciesController.findOneByIdOrFail(
        trait.speciesId
      );

      return {
        scope: AuthScope.Community,
        communityId: species.communityId,
        permissions: ["canEditSpecies"],
      };
    }
  )
  async deleteTrait(
    @Arg("input", () => TraitDeleteInput, { nullable: false })
    { id }: TraitDeleteInput,
    @Ctx() { traitController }: AppGraphqlContext
  ) {
    await traitController.deleteOneById(id);
    return new DeleteResponse(true);
  }

  @Mutation(() => TraitModifyResponse)
  @Preauthorize(
    async ({
      args: { input },
      context: { traitController, speciesController },
    }) => {
      const { id } = await parseArgToClass(input, TraitModifyInput);
      const trait = await traitController.findOneByIdOrFail(id);
      const species = await speciesController.findOneByIdOrFail(
        trait.speciesId
      );

      return {
        scope: AuthScope.Community,
        communityId: species.communityId,
        permissions: ["canEditSpecies"],
      };
    }
  )
  async modifyTrait(
    @Arg("input", () => TraitModifyInput, { nullable: false })
    input: TraitModifyInput,
    @Ctx()
    { transactionProvider }: AppGraphqlContext
  ) {
    return transactionProvider.runTransaction(
      async ({ traitController, enumValueController }) => {
        if (input.enumValues) {
          await enumValueController.setEnumValuesForTrait(
            input.id,
            input.enumValues
          );
        }

        return traitController.updateOneById(input.id, {
          name: input.name,
          valueType: input.valueType,
        });
      }
    );
  }
}
