import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Community } from "./Community";

@InputType()
export class CommunityCreateInput {
  @Field(() => String)
  name!: string;
}

@Resolver(() => Community)
export class CommunityResolver {
  @Mutation(() => Community)
  async createCommunity(
    @Arg("input") input: CommunityCreateInput,
    @Ctx() { communityController }: AppGraphqlContext
  ) {
    return await communityController.create(input);
  }
}
