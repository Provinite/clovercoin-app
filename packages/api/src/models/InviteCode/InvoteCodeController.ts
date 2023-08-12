import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
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
> {}
