import { createUnionType, Ctx, Query, Resolver } from "type-graphql";
import { Authenticated } from "../../business/auth/Authenticated.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Identity } from "./Identity.js";
import { IdentityList } from "./IdentityList.js";

export const IdentityListResponse = createUnionType({
  name: "IdentitylistResponse",
  types: () => [IdentityList, NotAuthorizedError],
});

@Resolver(() => Identity)
export class IdentityResolver {
  @Authenticated()
  @Query(() => IdentityListResponse)
  async identities(@Ctx() { identityController }: AppGraphqlContext) {
    return new IdentityList(await identityController.find());
  }
}
