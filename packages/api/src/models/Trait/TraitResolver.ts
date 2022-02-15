import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import { insertAndReturn } from "../util/insertAndReturn";
import { Trait } from "./Trait";

@InputType()
export class TraitCreateInput {
  @Field()
  name!: string;

  @Field()
  valueType!: CritterTraitValueTypes;
}

@Resolver(() => Trait)
export class TraitResolver {
  @Mutation(() => Trait)
  async createTrait(
    @Arg("input") input: TraitCreateInput,
    @Ctx() { traitRepository }: AppGraphqlContext
  ): Promise<Trait> {
    return await insertAndReturn(traitRepository, input);
  }
}
