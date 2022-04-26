import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { canHashPassword } from "../../util/crypto/canHashPassword";
import { compareHash } from "../../util/crypto/compareHash";
import { secureHash, secureHashSync } from "../../util/crypto/secureHash";
import { Account } from "./Account";

const mockHashedPassword = secureHashSync("password");
const wrongMockPassword = "p";

export type AccountCreate = Pick<
  Account,
  "identityId" | "username" | "password"
>;

export type VerifyResponse =
  | {
      success: true;
      account: Account;
    }
  | {
      success: false;
    };

export class AccountController extends EntityController<
  Account,
  Repository<Account>,
  AccountCreate
> {
  constructor({ accountRepository }: AppGraphqlContext) {
    super(accountRepository);
  }

  /**
   * @override
   */
  async createBodyToModel({
    username,
    password,
    identityId,
  }: AccountCreate): Promise<Account> {
    if (!canHashPassword(password)) {
      throw new Error("Invalid password");
    }
    return this.repository.create({
      username,
      identityId,
      password: await secureHash(password),
    });
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
    const account = await this.repository.findOne({
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
