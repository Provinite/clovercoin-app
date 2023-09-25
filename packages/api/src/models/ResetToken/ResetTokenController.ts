import { randomUUID } from "crypto";
import { IsNull, MoreThan, Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { ResetToken } from "./ResetToken.js";

export type ResetTokenCreate = Pick<ResetToken, "accountId">;
export class ResetTokenController extends EntityController<
  ResetToken,
  Repository<ResetToken>,
  ResetTokenCreate,
  never
> {
  constructor({
    resetTokenRepository,
    transactionProvider,
  }: AppGraphqlContext) {
    super(resetTokenRepository, transactionProvider);
  }

  async revokeOutstandingResetTokensForAccount(accountId: string) {
    await this.repository.update(
      {
        accountId,
        revokedAt: IsNull(),
        claimedAt: IsNull(),
      },
      {
        revokedAt: new Date(),
      }
    );
  }

  async createBodyToModel(createBody: ResetTokenCreate): Promise<ResetToken> {
    return this.repository.create({
      accountId: createBody.accountId,
      /**
       * We create a UUID from node's CSPRNG here.
       */
      id: randomUUID(),
      claimedAt: null,
      revokedAt: null,
    });
  }

  /**
   * Attempt to redeem (claim) a password reset token.
   * @throws {NotFoundError} if the token doesn't exist or is expired, revoked, or
   *  already redeemed.
   * @param id The reset token id
   * @returns The updated reset token
   */
  async redeemToken(id: string) {
    const updateResult = await this.repository.update(
      {
        id,
        // is not expired (issued less than 30 minutes ago)
        issuedAt: MoreThan(new Date(new Date().getTime() - 1000 * 60 * 30)),
        // has not been claimed
        claimedAt: IsNull(),
        // has not been revoked
        revokedAt: IsNull(),
      },
      {
        claimedAt: new Date(),
      }
    );

    if (!updateResult.affected) {
      throw new NotFoundError();
    }
    const result = await this.findOneById(id);
    if (result === null) {
      throw new NotFoundError();
    }
    return result;
  }
}
