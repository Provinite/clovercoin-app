import { TransactionProvider } from "../db/TransactionProvider.js";
import { InvalidArgumentError } from "../errors/InvalidArgumentError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import type { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { Account } from "../models/Account/Account.js";
import { Identity } from "../models/Identity/Identity.js";
import { InviteCodeExhaustedError } from "../models/InviteCode/InviteCodeConsumedError.js";
import { createJwt } from "../util/jwt/createJwt.js";

export type LoggedInResult =
  | { success: false }
  | { success: true; account: Account; identity: Identity; token: string };

export interface JwtPayload {
  identity: Pick<Identity, "id" | "displayName">;
}
export class LoginController {
  #transactionProvider: TransactionProvider;
  #adminEmail: string;

  constructor({
    transactionProvider,
    bootstrapEnvironment,
  }: AppGraphqlContext) {
    this.#transactionProvider = transactionProvider;
    this.#adminEmail = bootstrapEnvironment.adminEmail;
  }

  /**
   * Create a new account and identity
   * @param username
   * @param plaintextPassword
   * @param email
   * @param inviteCodeId
   * @returns
   */
  async register(
    username: string,
    plaintextPassword: string,
    email: string,
    inviteCodeId: string
  ): Promise<LoggedInResult> {
    return this.#transactionProvider.runTransaction(
      async ({
        identityController,
        accountController,
        inviteCodeController,
        communityMemberController,
      }) => {
        const isAdminUser = Boolean(
          this.#adminEmail && this.#adminEmail === email
        );

        let roleIdForInviteCode: string | null = null;

        // The bootstrap admin email can bypass invite requirements
        if (!isAdminUser) {
          try {
            await inviteCodeController.claimInviteCodeOrThrow(inviteCodeId);
            const inviteCode = await inviteCodeController.findOneByIdOrFail(
              inviteCodeId
            );
            roleIdForInviteCode = inviteCode.roleId;
          } catch (err) {
            if (err instanceof NotFoundError) {
              throw InvalidArgumentError.fromFieldMap({
                inviteCodeId: "Invite code not found",
              });
            } else if (err instanceof InviteCodeExhaustedError) {
              throw InvalidArgumentError.fromFieldMap({
                inviteCodeId: err.message,
              });
            }
            throw err;
          }
        }
        const identity = await identityController.create({
          displayName: username,
          email,
          canCreateCommunity: isAdminUser,
          canListIdentities: isAdminUser,
          canListInviteCodes: isAdminUser,
          canCreateInviteCode: isAdminUser,
        });
        const [account, token] = await Promise.all([
          accountController.create({
            username,
            password: plaintextPassword,
            identityId: identity.id,
          }),
          this.#createToken(identity),
          roleIdForInviteCode
            ? communityMemberController.create({
                identityId: identity.id,
                roleId: roleIdForInviteCode,
              })
            : Promise.resolve(),
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
