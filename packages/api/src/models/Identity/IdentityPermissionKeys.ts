import type { Identity } from "./Identity.js";

export type IdentityPermissionKeys = keyof Identity & `can${string}`;
const permissionsAsRecord: Record<IdentityPermissionKeys, true> = {
  canCreateCommunity: true,
  canCreateInviteCode: true,
  canGrantGlobalPermissions: true,
  canListIdentities: true,
  canListInviteCodes: true,
};

export const identityPermissionKeys = Object.keys(
  permissionsAsRecord
) as IdentityPermissionKeys[];
