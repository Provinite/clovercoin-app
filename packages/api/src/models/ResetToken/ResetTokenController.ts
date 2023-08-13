import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { ResetToken } from "./ResetToken.js";

export type ResetTokenCreate = Pick<ResetToken, "accountId">;
export class ResetTokenController extends EntityController<
  ResetToken,
  Repository<ResetToken>,
  ResetTokenCreate,
  never
> {
  constructor({ resetTokenRepository }: AppGraphqlContext) {
    super(resetTokenRepository);
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
}
