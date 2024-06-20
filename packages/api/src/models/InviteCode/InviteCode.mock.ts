import { v4 } from "uuid";
import { InviteCode } from "./InviteCode.js";

export interface MockInviteCodeOptions {
  customData?: Partial<InviteCode>;
  id?: string;
}

export const createMockInviteCode = ({
  id = v4(),
  customData = {},
}: MockInviteCodeOptions = {}) => {
  const mockInviteCode = new InviteCode();
  const defaults: Partial<InviteCode> = {
    id,
  };

  return Object.assign(mockInviteCode, defaults, customData);
};
