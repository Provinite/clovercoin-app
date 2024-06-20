import { v4 } from "uuid";
import { Identity } from "./Identity.js";

export interface MockIdentityOptions {
  customData?: Partial<Identity>;
  globalAdminPermissions?: boolean;
  emailAddress?: string;
  id?: string;
}

export const createMockIdentity = ({
  id = v4(),
  emailAddress = `${id}@example.com`,
  customData = {},
  globalAdminPermissions = false,
}: MockIdentityOptions = {}) => {
  const mockIdentity = new Identity();
  const defaults: Partial<Identity> = {
    canCreateCommunity: globalAdminPermissions,
    canCreateInviteCode: globalAdminPermissions,
    canGrantGlobalPermissions: globalAdminPermissions,
    canListIdentities: globalAdminPermissions,
    canListInviteCodes: globalAdminPermissions,
    displayName: `user-${v4()}`,
  };

  return Object.assign(mockIdentity, defaults, customData, {
    id,
    emailAddress,
  });
};
