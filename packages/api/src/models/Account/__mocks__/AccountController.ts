import { MockEntityController } from "../../../business/__mocks__/EntityController.js";
import { UnmockedMethodError } from "../../../test/UnmockedMethodError.js";

export class AccountController extends MockEntityController {
  resetPassword() {
    throw new UnmockedMethodError(
      this.constructor.name ?? AccountController.name,
      "resetPassword"
    );
  }
  verifyCredentials() {
    throw new UnmockedMethodError(
      this.constructor.name ?? AccountController.name,
      "verifyCredentials"
    );
  }
}

export const ResetTokenNotRedeemedError = jest.requireActual(
  "../AccountController.js"
).ResetTokenNotRedeemedError;
