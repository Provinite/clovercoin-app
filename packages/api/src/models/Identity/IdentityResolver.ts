import { createUnionType, Ctx, Query, Resolver } from "type-graphql";
import { hasGlobalPerms } from "../../business/auth/authorizationInfoGenerators/hasGlobalPerms.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Identity } from "./Identity.js";
import { IdentityList } from "./IdentityList.js";

export const IdentityListResponse = createUnionType({
  name: "IdentitylistResponse",
  types: () => [IdentityList, NotAuthenticatedError],
});

@Resolver(() => Identity)
export class IdentityResolver {
  @Preauthorize(hasGlobalPerms(["canListIdentities"]))
  @Query(() => IdentityListResponse)
  async identities(@Ctx() { identityController }: AppGraphqlContext) {
    return new IdentityList(await identityController.find());
  }
}
