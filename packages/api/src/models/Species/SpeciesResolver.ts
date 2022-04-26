import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { ILike } from "typeorm";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Species } from "./Species";

@InputType()
export class SpeciesCreateInput {
  @Field()
  name!: string;

  @Field(() => ID)
  communityId!: string;
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
            where: {
              name: ILike(`%${speciesFilters.name}%`),
            },
          }
        : undefined
    );
  }

  @Mutation(() => Species)
  async createSpecies(
    @Arg("input") input: SpeciesCreateInput,
    @Ctx() { speciesController }: AppGraphqlContext
  ): Promise<Species> {
    return await speciesController.create(input);
  }
}
