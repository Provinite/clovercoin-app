import { IsUUID, MinLength } from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { FindManyOptions, ILike, In } from "typeorm";
import { hasGlobalPerms } from "../../business/auth/authorizationInfoGenerators/hasGlobalPerms.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { IdentityList } from "../Identity/IdentityList.js";
import { Community } from "./Community.js";
import { CommunityMembersResponse } from "./CommunityMembersResponse.js";

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
  types: () => [
    Community,
    DuplicateError,
    InvalidArgumentError,
    NotAuthenticatedError,
    NotAuthorizedError,
  ],
});

const CommunityResponse = createUnionType({
  name: "CommunityResponse",
  types: () => [
    Community,
    NotFoundError,
    InvalidArgumentError,
    NotAuthenticatedError,
    NotAuthorizedError,
  ],
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
  @Preauthorize(hasGlobalPerms(["canCreateCommunity"]))
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
  @Preauthorize()
  @Query(() => CommunitiesResponse, {
    description: "Fetch a list of communities with filtering",
  })
  async communities(
    @Ctx() { communityRepository, principal }: AppGraphqlContext,
    @Arg("filters") communityFilters: CommunityFilters
  ): Promise<CommunityList> {
    const filters: FindManyOptions<Community> = {};
    filters.where = {};
    if (communityFilters) {
      const { id, name } = communityFilters;
      if (id) {
        filters.where.id = id;
      }
      if (name) {
        filters.where.name = ILike(`%${name}%`);
      }
    }
    filters.where.roles = {
      id: In(principal!.communityMemberships.map((cm) => cm.roleId)),
    };

    return new CommunityList(await communityRepository.find(filters));
  }

  /**
   *
   * @param ctx gql context
   * @param communityFilters filters
   * @returns A single community
   */
  @Preauthorize()
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

  @Preauthorize()
  @FieldResolver(() => CommunityMembersResponse)
  async members(
    @Root() community: Community,
    @Ctx() { identityController }: AppGraphqlContext
  ) {
    const results = await identityController.find({
      communityMemberships: {
        role: {
          communityId: community.id,
        },
      },
    });

    return new IdentityList(results);
  }
}
