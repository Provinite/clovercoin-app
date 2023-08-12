import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import { CheckConstraintError } from "../../errors/CheckConstraintError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { InviteCode } from "./InviteCode.js";
import { InviteCodeExhaustedError } from "./InviteCodeConsumedError.js";

export type InviteCodeCreate = Pick<
  InviteCode,
  "id" | "maxClaims" | "creatorId"
>;

export class InviteCodeController extends EntityController<
  InviteCode,
  Repository<InviteCode>,
  InviteCodeCreate,
  never
> {
  constructor({ inviteCodeRepository }: AppGraphqlContext) {
    super(inviteCodeRepository);
  }

  async createBodyToModel(createBody: InviteCodeCreate): Promise<InviteCode> {
    return this.repository.create({
      ...createBody,
      claimCount: 0,
    });
  }

  async claimInviteCodeOrThrow(id: string) {
    try {
      const result = await this.repository.update(
        { id },
        { claimCount: () => '"claimCount" + 1' }
      );
      if (!result || !result.affected) {
        throw new NotFoundError();
      }
    } catch (err) {
      const constraintError = CheckConstraintError.fromPostgresError(err);
      if (
        constraintError &&
        constraintError.constraintName === "chk_invite_code_not_over_used"
      ) {
        throw new InviteCodeExhaustedError();
      }
      throw err;
    }
  }
}
