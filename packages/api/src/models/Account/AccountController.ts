import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { canHashPassword } from "../../util/crypto/canHashPassword";
import { compareHash } from "../../util/crypto/compareHash";
import { secureHash, secureHashSync } from "../../util/crypto/secureHash";
import { Account } from "./Account";

const mockHashedPassword = secureHashSync("password");
const wrongMockPassword = "p";

export type VerifyResponse =
  | {
      success: true;
      account: Account;
    }
  | {
      success: false;
    };

export class AccountController {
  #repository: AppGraphqlContext["accountRepository"];
  constructor({ accountRepository }: AppGraphqlContext) {
    this.#repository = accountRepository;
  }

  async createAccount(username: string, password: string, identityId: string) {
    if (!canHashPassword(password)) {
      throw new Error("Invalid password");
    }
    const account = this.#repository.create({
      username,
      identity: { id: identityId },
    });
    account.password = await secureHash(password);

    console.log(account);

    return this.#repository.save(account);
  }

  /**
   * Constant-time verification of user credentials
   * @param username
   * @param password
   */
  async verifyCredentials(
    username: string,
    password: string
  ): Promise<VerifyResponse> {
    const account = await this.#repository.findOne({
      where: {
        username,
      },
    });
    const compareResult = await compareHash(
      account ? password : wrongMockPassword,
      account ? account.password : mockHashedPassword
    );
    if (compareResult) {
      if (!account) {
        /**
         * "This should never happen"
         */
        throw new Error("Error during login");
      }
      return {
        success: true,
        account,
      };
    } else {
      return {
        success: false,
      };
    }
  }
}
