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
import { Community } from "./Community";

@InputType()
export class CommunityCreateInput {
  @Field(() => String)
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
  id!: string | null;
}

@Resolver(() => Community)
export class CommunityResolver {
  @Mutation(() => Community)
  async createCommunity(
    @Arg("input") input: CommunityCreateInput,
    @Ctx() { communityController }: AppGraphqlContext
  ): Promise<Community> {
    return await communityController.create(input);
  }

  @Query(() => [Community])
  async communities(
    @Ctx() { communityRepository }: AppGraphqlContext,
    @Arg("filters") communityFilters: CommunityFilters
  ) {
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
    return await communityRepository.find(filters);
  }

  @Query(() => Community)
  async community(
    @Arg("filters") filters: CommunityFilters,
    @Ctx() { communityController }: AppGraphqlContext
  ) {
    const result = await communityController.find({
      name: filters.name ?? undefined,
      id: filters.id ?? undefined,
    });
    if (!result.length) {
      throw new Error("404");
    }
    return result[0];
  }
}
