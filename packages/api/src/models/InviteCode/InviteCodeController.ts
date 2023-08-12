import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { InviteCode } from "./InviteCode.js";

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
}
