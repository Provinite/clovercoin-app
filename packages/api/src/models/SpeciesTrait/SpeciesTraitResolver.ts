import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { insertAndReturn } from "../util/insertAndReturn";
import { SpeciesTrait } from "./SpeciesTrait";

@InputType()
class SpeciesTraitCreateInput {
  @Field(() => ID)
  speciesId!: string;

  @Field(() => ID)
  traitId!: string;
}

@Resolver(() => SpeciesTrait)
export class SpeciesTraitResolver {
  @Mutation(() => SpeciesTrait)
  async createSpeciesTrait(
    @Arg("input") input: SpeciesTraitCreateInput,
    @Ctx() { speciesTraitRepository }: AppGraphqlContext
  ) {
    return await insertAndReturn(speciesTraitRepository, input);
  }
}
