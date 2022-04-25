import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import { EnumValue } from "../EnumValue/EnumValue";
import { EnumValueCreate } from "../EnumValue/EnumValueController";
import { Trait } from "./Trait";
import { TraitCreate } from "./TraitController";

@InputType()
export class TraitCreateInput {
  @Field()
  name!: string;

  @Field(() => CritterTraitValueTypes)
  valueType!: CritterTraitValueTypes;

  @Field(() => [TraitCreateEnumValueInput])
  enumValues!: TraitCreateEnumValueInput[];
}

@InputType()
export class TraitCreateEnumValueInput {
  @Field()
  name!: string;
}

@Resolver(() => Trait)
export class TraitResolver {
  @Mutation(() => Trait)
  async createTrait(
    @Arg("input") input: TraitCreateInput,
    @Ctx() { transactionProvider }: AppGraphqlContext
  ): Promise<Trait> {
    return await transactionProvider.runTransaction(
      async ({ traitController, enumValueController }) => {
        const traitCreateBody: TraitCreate = {
          name: input.name,
          valueType: input.valueType,
        };
        const trait = await traitController.create(traitCreateBody);

        const enumValueCreateBodies: EnumValueCreate[] = [];

        if (
          input.valueType === CritterTraitValueTypes.Enum &&
          input.enumValues.length
        ) {
          for (const enumValue of input.enumValues) {
            enumValueCreateBodies.push({
              name: enumValue.name,
              trait,
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
}
