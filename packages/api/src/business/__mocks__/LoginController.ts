import type {
  LoggedInResult,
  LoginController as RealLoginController,
} from "../LoginController.js";
export class LoginController
  implements Pick<RealLoginController, keyof RealLoginController>
{
  register(): Promise<LoggedInResult> {
    throw new Error("Mock not implemented.");
  }
  login(): Promise<LoggedInResult> {
    throw new Error("Mock not implemented.");
  }
}
