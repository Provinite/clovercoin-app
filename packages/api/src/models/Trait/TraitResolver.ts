import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Authenticated } from "../../business/auth/Authenticated.js";
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

@Resolver(() => Trait)
export class TraitResolver {
  @Authenticated()
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

  @Query(() => [Trait])
  async traits(
    @Arg("filters", () => TraitFilters) filters: TraitFilters,
    @Ctx() { traitRepository }: AppGraphqlContext
  ): Promise<Trait[]> {
    const result = traitRepository.find({
      where: {
        speciesId: filters.speciesId,
      },
    });
    return result;
  }

  @Authenticated()
  @Mutation(() => String)
  async deleteTrait(
    @Arg("id", () => ID, { nullable: false }) id: string,
    @Ctx() { traitController }: AppGraphqlContext
  ) {
    traitController.deleteOneById(id);
    return "deleted";
  }

  @Authenticated()
  @Mutation(() => TraitModifyResponse)
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
