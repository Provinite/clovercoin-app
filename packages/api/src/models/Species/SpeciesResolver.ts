import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { insertAndReturn } from "../util/insertAndReturn";
import { Species } from "./Species";

@InputType()
export class SpeciesCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class SpeciesFilters {
  @Field(() => String, { nullable: true, defaultValue: null })
  name: string | null = null;
}

@Resolver(() => Species)
export class SpeciesResolver {
  @Query(() => [Species])
  async species(
    @Arg("filters", () => SpeciesFilters, { nullable: true })
    speciesFilters: SpeciesFilters | null = null,
    @Ctx() { speciesRepository }: AppGraphqlContext
  ): Promise<Species[]> {
    return await speciesRepository.find(
      speciesFilters
        ? {
            where: speciesFilters,
          }
        : undefined
    );
  }

  @Mutation(() => Species)
  async createSpecies(
    @Arg("input") input: SpeciesCreateInput,
    @Ctx() { speciesRepository }: AppGraphqlContext
  ): Promise<Species> {
    return await insertAndReturn(speciesRepository, input);
  }
}
