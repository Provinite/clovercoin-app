import { Ctx, Query, Resolver } from "type-graphql";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Identity } from "./Identity.js";

@Resolver(() => Identity)
export class IdentityResolver {
  @Query(() => [Identity])
  async identities(@Ctx() { identityController }: AppGraphqlContext) {
    return identityController.find();
  }
}
