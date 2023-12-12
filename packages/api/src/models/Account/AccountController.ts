import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { canHashPassword } from "../../util/crypto/canHashPassword.js";
import { compareHash } from "../../util/crypto/compareHash.js";
import { secureHash, secureHashSync } from "../../util/crypto/secureHash.js";
import { ResetToken } from "../ResetToken/ResetToken.js";
import { Account } from "./Account.js";

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
  constructor({ accountRepository, transactionProvider }: AppGraphqlContext) {
    super(accountRepository, transactionProvider);
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

  async resetPassword(resetToken: ResetToken, plainTextPassword: string) {
    if (!resetToken.claimedAt) {
      throw new ResetTokenNotRedeemedError(
        "Reset token must be redeemed before resetting a password."
      );
    }
    await this.repository.update(
      { id: resetToken.accountId },
      {
        password: await secureHash(plainTextPassword),
      }
    );
  }

  /**
   * Constant-time verification of user credentials
   * @param email
   * @param password
   */
  async verifyCredentials(
    email: string,
    password: string
  ): Promise<VerifyResponse> {
    const account = await this.repository.findOne({
      where: {
        identity: {
          email,
        },
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

export class ResetTokenNotRedeemedError extends Error {
  constructor(message = "Invalid reset token") {
    super(message);
  }
}
