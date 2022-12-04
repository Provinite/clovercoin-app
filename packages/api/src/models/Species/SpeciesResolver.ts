import { IsOptional, IsUrl, IsUUID, MinLength } from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { FindManyOptions, ILike } from "typeorm";
import { DuplicateError } from "../../errors/DuplicateError";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Species } from "./Species";

@InputType()
export class SpeciesCreateInput {
  @Field()
  @MinLength(1)
  name!: string;

  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  communityId!: string;

  @Field(() => String, { nullable: false })
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
    protocols: ["https", "http"],
    allow_protocol_relative_urls: false,
    validate_length: false,
  })
  iconUrl!: string;
}

@InputType()
export class SpeciesFilters {
  @Field(() => String, { nullable: true, defaultValue: null })
  @IsOptional()
  @MinLength(1)
  name: string | null = null;

  @Field(() => ID, { nullable: true, defaultValue: null })
  @IsOptional()
  @IsUUID(4)
  id: string | null = null;

  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  communityId!: string;
}

const SpeciesCreateResponse = createUnionType({
  name: "SpeciesCreateResponse",
  types: () => [Species, InvalidArgumentError, DuplicateError],
});

@ObjectType()
class SpeciesList {
  constructor(list: Species[] = []) {
    this.list = list;
  }
  @Field(() => [Species])
  list!: Species[];
}

const SpeciesResponse = createUnionType({
  name: "SpeciesResponse",
  types: () => [SpeciesList, InvalidArgumentError],
});

@Resolver(() => Species)
export class SpeciesResolver {
  @Query(() => SpeciesResponse)
  async species(
    @Arg("filters", () => SpeciesFilters, { nullable: true })
    speciesFilters: SpeciesFilters | null = null,
    @Ctx() { speciesRepository }: AppGraphqlContext
  ): Promise<SpeciesList> {
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
    return new SpeciesList(await speciesRepository.find(filters));
  }

  @Mutation(() => SpeciesCreateResponse)
  async createSpecies(
    @Arg("input") input: SpeciesCreateInput,
    @Ctx() { speciesController }: AppGraphqlContext
  ): Promise<Species> {
    return await speciesController.create(input);
  }
}
