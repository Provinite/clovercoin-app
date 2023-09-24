import { graphqlService } from "../../graphql/client";
import { typedRouteConfig } from "../../routes";
import { makeAction } from "../../utils/loaderUtils";

export const identityRouteAction = makeAction(
  {
    allowedMethods: ["patch"],
    slugs: { identitySlug: true },
    form: {
      canCreateCommunity: false,
      canCreateInviteCode: false,
      canGrantGlobalPermissions: false,
      canListIdentities: false,
      canListInviteCodes: false,
    },
  },
  async ({
    ids: { identityId },
    form: {
      canCreateCommunity,
      canCreateInviteCode,
      canGrantGlobalPermissions,
      canListIdentities,
      canListInviteCodes,
    },
  }) => {
    const parseOptionalBoolVal = (formVal: string | undefined) => {
      if (formVal === undefined) return formVal;
      return formVal === "true";
    };
    const {
      data: { modifyIdentity },
    } = await graphqlService.modifyIdentity({
      variables: {
        input: {
          id: identityId,
          canCreateCommunity: parseOptionalBoolVal(canCreateCommunity),
          canCreateInviteCode: parseOptionalBoolVal(canCreateInviteCode),
          canGrantGlobalPermissions: parseOptionalBoolVal(
            canGrantGlobalPermissions
          ),
          canListIdentities: parseOptionalBoolVal(canListIdentities),
          canListInviteCodes: parseOptionalBoolVal(canListInviteCodes),
        },
      },
    });
    return modifyIdentity;
  }
);

export const identityRoute = typedRouteConfig({
  id: "root.identity",
  path: "identities/:identitySlug",
  action: identityRouteAction,
});
