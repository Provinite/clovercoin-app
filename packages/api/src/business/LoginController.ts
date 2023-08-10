import { TransactionProvider } from "../db/TransactionProvider.js";
import type { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { Account } from "../models/Account/Account.js";
import { Identity } from "../models/Identity/Identity.js";
import { createJwt } from "../util/jwt/createJwt.js";

export type LoggedInResult =
  | { success: false }
  | { success: true; account: Account; identity: Identity; token: string };

export interface JwtPayload {
  identity: Pick<Identity, "id" | "displayName">;
}
export class LoginController {
  #transactionProvider: TransactionProvider;

  constructor({ transactionProvider }: AppGraphqlContext) {
    this.#transactionProvider = transactionProvider;
  }

  /**
   * Create a new account and identity
   * @param username
   * @param plaintextPassword
   * @param email
   * @returns
   */
  async register(
    username: string,
    plaintextPassword: string,
    email: string
  ): Promise<LoggedInResult> {
    return this.#transactionProvider.runTransaction(
      async ({ identityController, accountController }) => {
        const identity = await identityController.create({
          displayName: username,
          email,
        });
        console.log(identity);
        const [account, token] = await Promise.all([
          accountController.create({
            username,
            password: plaintextPassword,
            identityId: identity.id,
          }),
          this.#createToken(identity),
        ]);
        return { success: true, identity, account, token };
      }
    );
  }

  /**
   * Authenticate a user using local credentials
   * @param username
   * @param plaintextPassword
   * @returns A result object with a success boolean, and on successful authentication,
   *  the resulting account and identity.
   */
  async login(
    username: string,
    plaintextPassword: string
  ): Promise<LoggedInResult> {
    return this.#transactionProvider.runTransaction(
      async ({ accountController, identityRepository }) => {
        const result = await accountController.verifyCredentials(
          username,
          plaintextPassword
        );

        if (result.success) {
          const { account } = result;
          const identity = await identityRepository.findOne({
            where: {
              id: account.identityId,
            },
          });
          if (!identity) {
            throw new Error("Identity not found");
          }
          const token = await this.#createToken(identity);
          return {
            success: true,
            account,
            identity,
            token,
          };
        } else {
          return {
            success: false,
          };
        }
      }
    );
  }

  /**
   * Create an authentication token.
   * @param identity
   * @returns
   */
  async #createToken(identity: Identity): Promise<string> {
    return createJwt<JwtPayload>({
      identity: {
        displayName: identity.displayName,
        id: identity.id,
      },
    });
  }
}
