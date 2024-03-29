import { ResolverData } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { IdentityPermissionKeys } from "../../models/Identity/IdentityPermissionKeys.js";
import { RolePermissionKeys } from "../../models/Role/Role.js";

export enum AuthScope {
  Community,
  Global,
  Critter,
  Identity,
}

export type CritterAuthInfo = {
  scope: AuthScope.Critter;
  critterId: string;
  permissions: CritterPermissions[];
};

export type CommunityAuthInfo = {
  scope: AuthScope.Community;
  communityId: string;
  permissions: RolePermissionKeys[];
};

export type GlobalAuthInfo = {
  scope: AuthScope.Global;
  permissions: IdentityPermissionKeys[];
};

export type IdentityAuthInfo = {
  scope: AuthScope.Identity;
  identityId: string;
  permissions: IdentityPermissions[];
};

export type AuthInfo =
  | CritterAuthInfo
  | CommunityAuthInfo
  | GlobalAuthInfo
  | IdentityAuthInfo;

export type AuthInfoSpecifier = AuthInfo | CompoundAuthInfo | AuthInfoFn | null;
type MaybePromise<T> = T | Promise<T>;

export type AuthInfoFn = (
  data: ResolverData<AppGraphqlContext>
) => MaybePromise<AuthInfo | CompoundAuthInfo | null>;

export type CompoundAuthInfo = {
  kind: "anyOf" | "allOf";
  authInfos: AuthInfoSpecifier[];
};

export type CritterPermissions = "canEditOwn";
export type IdentityPermissions =
  | "canViewPendingInvites"
  | "canAnswerInvites"
  | "canViewEmail";
export function isCompoundAuthInfo(
  authInfo: AuthInfo | CompoundAuthInfo
): authInfo is CompoundAuthInfo {
  return "kind" in authInfo;
}
