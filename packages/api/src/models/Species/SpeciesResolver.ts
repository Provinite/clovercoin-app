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
import { FindManyOptions, ILike } from "typeorm";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Species } from "./Species";

@InputType()
export class SpeciesCreateInput {
  @Field()
  name!: string;

  @Field(() => ID, { nullable: false })
  communityId!: string;

  @Field(() => String, { nullable: false })
  iconUrl!: string;
}

@InputType()
export class SpeciesFilters {
  @Field(() => String, { nullable: true, defaultValue: null })
  name: string | null = null;

  @Field(() => ID, { nullable: true, defaultValue: null })
  id: string | null = null;

  @Field(() => ID, { nullable: false })
  communityId!: string;
}

@Resolver(() => Species)
export class SpeciesResolver {
  @Query(() => [Species])
  async species(
    @Arg("filters", () => SpeciesFilters, { nullable: true })
    speciesFilters: SpeciesFilters | null = null,
    @Ctx() { speciesRepository }: AppGraphqlContext
  ): Promise<Species[]> {
    const filters: FindManyOptions<Species> = {};

    if (speciesFilters) {
      const { id, name, communityId } = speciesFilters;
      filters.where = {};
      if (id) {
        filters.where.id = id;
      }
      if (name) {
        filters.where.name = ILike(`%${name}%`);
      }
      filters.where.communityId = communityId;
    }
    return speciesRepository.find(filters);
  }

  @Mutation(() => Species)
  async createSpecies(
    @Arg("input") input: SpeciesCreateInput,
    @Ctx() { speciesController }: AppGraphqlContext
  ): Promise<Species> {
    return await speciesController.create(input);
  }
}
