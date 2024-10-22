import { MockEntityController } from "../../../business/__mocks__/EntityController.js";
import { UnmockedMethodError } from "../../../test/UnmockedMethodError.js";

export class ResetTokenController extends MockEntityController {
  revokeOutstandingResetTokensForAccount() {
    throw new UnmockedMethodError(
      this.constructor.name ?? ResetTokenController.name,
      this.revokeOutstandingResetTokensForAccount.name
    );
  }
  redeemToken() {
    throw new UnmockedMethodError(
      this.constructor.name ?? ResetTokenController.name,
      this.redeemToken.name
    );
  }
}
