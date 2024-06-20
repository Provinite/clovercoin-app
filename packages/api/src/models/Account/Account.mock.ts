import { v4 } from "uuid";
import { Identity } from "../Identity/Identity.js";
import { createMockIdentity } from "../Identity/Identity.mock.js";
import { Account } from "./Account.js";

export interface MockAccountOptions {
  customData?: Partial<Account>;
  identity?: Identity;
  id?: string;
  username?: string;
  password?: string;
}

export const createMockAccount = ({
  id = v4(),
  identity = createMockIdentity(),
  username = `user-${id}`,
  password = "some-hash",
  customData = {},
}: MockAccountOptions = {}): Account => {
  const mockIdentity = new Account();
  const defaults: Partial<Account> = {
    id,
    identityId: identity.id,
    password,
    username,
  };

  return Object.assign(mockIdentity, defaults, customData);
};
