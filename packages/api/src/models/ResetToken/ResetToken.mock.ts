import { v4 } from "uuid";
import { ResetToken } from "./ResetToken.js";

export interface MockResetTokenOptions {
  customData?: Partial<ResetToken>;
  id?: string;
  accountId?: string;
  issuedAt?: Date;
  revokedAt?: null | Date;
}

export const createMockResetToken = ({
  id = v4(),
  accountId = v4(),
  customData = {},
  issuedAt = new Date(),
  revokedAt = null,
}: MockResetTokenOptions = {}) => {
  const mockResetToken = new ResetToken();
  const defaults: Partial<ResetToken> = {
    accountId,
    issuedAt,
    revokedAt,
  };

  return Object.assign(mockResetToken, defaults, customData, {
    id,
  });
};
