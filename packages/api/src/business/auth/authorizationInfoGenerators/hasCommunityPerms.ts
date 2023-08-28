import { RolePermissionKeys } from "../../../models/Role/Role.js";
import { AuthInfoFn, AuthScope } from "../AuthInfo.js";
import { NotAuthorizedError } from "../NotAuthorizedError.js";

export const hasCommunityPerms =
  (permissions: RolePermissionKeys[] = []): AuthInfoFn =>
  (resolverData) => {
    const communityId = resolverData.args.input?.communityId;
    if (!communityId || typeof communityId !== "string") {
      throw new NotAuthorizedError();
    }
    const result = {
      scope: AuthScope.Community,
      communityId,
      permissions,
    } as const;

    return result;
  };
