import { Repository } from "typeorm/repository/Repository.js";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { CommunityMember } from "./CommunityMember.js";

export type CommunityMemberCreate = Pick<
  CommunityMember,
  "identityId" | "roleId"
>;
export class CommunityMemberController extends EntityController<
  CommunityMember,
  Repository<CommunityMember>,
  CommunityMemberCreate
> {
  constructor({ communityMemberRepository }: AppGraphqlContext) {
    super(communityMemberRepository);
  }
}
