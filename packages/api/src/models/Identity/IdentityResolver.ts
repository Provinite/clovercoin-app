import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import type { ResolverData } from "type-graphql";
import { IsNull } from "typeorm";
import { AuthScope } from "../../business/auth/AuthInfo.js";
import { hasGlobalPerms } from "../../business/auth/authorizationInfoGenerators/hasGlobalPerms.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { anyAuth, Preauthorize } from "../../business/auth/Preauthorize.js";
import { runAuthorization } from "../../business/auth/runAuthorization.js";
import { parseArgToClass } from "../../business/validation/parseArgToClass.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { RawResolverData } from "../../graphql/RawResolverData.js";
import { CommunityInvitation } from "../CommunityInvitation/CommunityInvitation.js";
import { RoleList } from "../Role/RoleList.js";
import { Identity } from "./Identity.js";
import { IdentityList } from "./IdentityList.js";
import { IdentityRolesFilters } from "./IdentityRolesFilters.js";
import { IdentityRolesResponse } from "./IdentityRolesResponse.js";
import { IdentityModifyInput } from "./IdentityModifyInput.js";
import { identityPermissionKeys } from "./IdentityPermissionKeys.js";
import { IdentityModifyResponse } from "./IdentityModifyResponse.js";

export const IdentityListResponse = createUnionType({
  name: "IdentitylistResponse",
  types: () => [IdentityList, NotAuthenticatedError, NotAuthorizedError],
});

export const IdentityResponse = createUnionType({
  name: "IdentityResponse",
  types: () => [NotAuthenticatedError, Identity, NotAuthorizedError],
});

@ObjectType()
export class CommunityInvitationList {
  constructor(list: CommunityInvitation[]) {
    this.list = list;
  }
  @Field(() => [CommunityInvitation])
  list!: CommunityInvitation[];
}

export const PendingInvitationsResponse = createUnionType({
  name: "PendingInvitationsResponse",
  types: () => [CommunityInvitationList, NotAuthorizedError],
});

@Resolver(() => Identity)
export class IdentityResolver {
  // #region queries
  @Preauthorize(hasGlobalPerms(["canListIdentities"]))
  @Query(() => IdentityListResponse)
  async identities(@Ctx() { identityController }: AppGraphqlContext) {
    return new IdentityList(await identityController.find());
  }

  @Query(() => Identity)
  @Preauthorize()
  async me(@Ctx() { principal }: AppGraphqlContext): Promise<Identity> {
    return principal!;
  }
  // #endregion

  // #region mutations
  @Preauthorize(async ({ args: { input } }) => {
    const arg = await parseArgToClass(input, IdentityModifyInput);
    for (const key of identityPermissionKeys) {
      if (typeof arg[key] === "boolean") {
        return {
          scope: AuthScope.Global,
          permissions: ["canGrantGlobalPermissions"],
        };
      }
    }
    return null;
  })
  @Mutation(() => IdentityModifyResponse)
  modifyIdentity(
    @Arg("input")
    {
      id,
      canCreateCommunity,
      canCreateInviteCode,
      canGrantGlobalPermissions,
      canListIdentities,
      canListInviteCodes,
    }: IdentityModifyInput,
    @Ctx() { identityController }: AppGraphqlContext
  ): Promise<Identity> {
    return identityController.updateOneById(id, {
      canCreateCommunity,
      canCreateInviteCode,
      canGrantGlobalPermissions,
      canListIdentities,
      canListInviteCodes,
    });
  }
  // #endregion

  // #region field resolvers

  // PERF: This field could be dataloaderized. In practice this is only
  // used on one identity at a time though.
  @Preauthorize(
    anyAuth(hasGlobalPerms(["canListIdentities"]), ({ root: { id } }) => ({
      scope: AuthScope.Identity,
      identityId: id,
      permissions: ["canViewPendingInvites"],
    }))
  )
  @FieldResolver(() => PendingInvitationsResponse)
  async pendingInvitations(
    @Root() invitee: Identity,
    @Ctx() { communityInvitationController }: AppGraphqlContext
  ) {
    const result = await communityInvitationController.find({
      inviteeId: invitee.id,
      acceptedAt: IsNull(),
      declinedAt: IsNull(),
    });
    return new CommunityInvitationList(result);
  }

  // PERF: This probably _needs_ to be dataloaderized
  // it will run on potentially many identities at a time
  @Preauthorize(async ({ args: { filters } }) => {
    const { communityId } = await parseArgToClass(
      filters,
      IdentityRolesFilters
    );
    return {
      scope: AuthScope.Community,
      communityId,
      permissions: [],
    };
  })
  @FieldResolver(() => IdentityRolesResponse)
  async roles(
    @Root() identity: Identity,
    @Arg("filters") input: IdentityRolesFilters,
    @Ctx() { roleController }: AppGraphqlContext
  ) {
    const roles = await roleController.find({
      communityMembers: {
        identityId: identity.id,
      },
      communityId: input.communityId,
    });

    return new RoleList(roles);
  }

  @FieldResolver()
  async email(
    @Root() root: Identity,
    @Ctx() context: AppGraphqlContext,
    @RawResolverData resolverData: ResolverData<AppGraphqlContext>
  ) {
    const { principal } = context;
    if (!principal) {
      return "";
    }
    const { result } = await runAuthorization(
      anyAuth(
        {
          scope: AuthScope.Identity,
          identityId: root.id,
          permissions: ["canViewEmail"],
        },
        {
          scope: AuthScope.Global,
          permissions: ["canListIdentities"],
        }
      ),
      resolverData
    );

    if (result === "ok") {
      return root.email;
    } else {
      return "";
    }
  }

  // #endregion
}
