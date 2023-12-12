import { IdentityPermissionKeys } from "../../../models/Identity/IdentityPermissionKeys.js";
import { AuthInfoFn, AuthScope } from "../AuthInfo.js";

export const hasGlobalPerms =
  (permissions: IdentityPermissionKeys[]): AuthInfoFn =>
  () => ({
    scope: AuthScope.Global,
    permissions,
  });
