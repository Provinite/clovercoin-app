import { RolePermissionKeys } from "../../../models/Role/Role.js";
import { AuthInfoFn, AuthScope, CommunityAuthInfo } from "../AuthInfo.js";
import { NotAuthorizedError } from "../NotAuthorizedError.js";

export const hasCommunityPerms =
  (permissions: RolePermissionKeys[] = []): AuthInfoFn<CommunityAuthInfo> =>
  (resolverData) => {
    const communityId = resolverData.args.input?.communityId;
    if (!communityId || typeof communityId !== "string") {
      throw new NotAuthorizedError();
    }

    return {
      scope: AuthScope.Community,
      communityId,
      permissions,
    };
  };
