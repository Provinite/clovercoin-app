import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import { EnumValueCreate } from "../EnumValue/EnumValueController";
import { Trait } from "./Trait";
import { TraitCreate } from "./TraitController";
import {
  TraitCreateInput,
  TraitCreateResponse,
  TraitFilters,
  TraitModifyInput,
  TraitModifyResponse,
} from "./TraitTypes";

@Resolver(() => Trait)
export class TraitResolver {
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

  @Mutation(() => String)
  async deleteTrait(
    @Arg("id", () => ID, { nullable: false }) id: string,
    @Ctx() { traitController }: AppGraphqlContext
  ) {
    traitController.deleteOneById(id);
    return "deleted";
  }

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
