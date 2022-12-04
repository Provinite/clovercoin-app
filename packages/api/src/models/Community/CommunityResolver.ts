import { IsUUID, MinLength } from "class-validator";
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
import { NotFoundError } from "../../errors/NotFoundError";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Community } from "./Community";

@InputType()
export class CommunityCreateInput {
  @Field(() => String)
  @MinLength(3)
  name!: string;
}

@InputType()
export class CommunityFilters {
  @Field(() => String, {
    nullable: true,
    defaultValue: null,
  })
  name!: string | null;

  @Field(() => ID, {
    nullable: true,
    defaultValue: null,
  })
  @IsUUID(4)
  id!: string | null;
}

/**
 * CreateCommunity mutation response type with all
 * known errors.
 */
const CreateCommunityResponse = createUnionType({
  name: "CreateCommunityResponse",
  types: () => [Community, DuplicateError, InvalidArgumentError],
});

const CommunityResponse = createUnionType({
  name: "CommunityResponse",
  types: () => [Community, NotFoundError, InvalidArgumentError],
});

const CommunitiesResponse = createUnionType({
  name: "CommunitiesResponse",
  types: () => [CommunityList, InvalidArgumentError],
});

@ObjectType()
class CommunityList {
  constructor(list: Community[] = []) {
    this.list = list;
  }
  @Field(() => [Community])
  list!: Community[];
}

@Resolver(() => Community)
export class CommunityResolver {
  @Mutation(() => CreateCommunityResponse, {
    description: "Create a new community",
  })
  async createCommunity(
    @Arg("input") input: CommunityCreateInput,
    @Ctx() { communityController }: AppGraphqlContext
  ): Promise<Community> {
    return communityController.create(input);
  }

  /**
   * Fetch multiple communities
   * @param ctx gql context
   * @param communityFilters filters
   * @returns
   */
  @Query(() => CommunitiesResponse, {
    description: "Fetch a list of communities with filtering",
  })
  async communities(
    @Ctx() { communityRepository }: AppGraphqlContext,
    @Arg("filters") communityFilters: CommunityFilters
  ): Promise<CommunityList> {
    const filters: FindManyOptions<Community> = {};
    if (communityFilters) {
      const { id, name } = communityFilters;
      filters.where = {};
      if (id) {
        filters.where.id = id;
      }
      if (name) {
        filters.where.name = ILike(`%${name}%`);
      }
    }
    return new CommunityList(await communityRepository.find(filters));
  }

  /**
   *
   * @param ctx gql context
   * @param communityFilters filters
   * @returns A single community
   */
  @Query(() => CommunityResponse, {
    description: "Fetch a community by id and/or name",
  })
  async community(
    @Ctx() { communityController }: AppGraphqlContext,
    @Arg("filters") communityFilters: CommunityFilters
  ) {
    const result = await communityController.find({
      name: communityFilters.name ?? undefined,
      id: communityFilters.id ?? undefined,
    });
    if (!result.length) {
      throw new NotFoundError();
    }
    return result[0];
  }
}
