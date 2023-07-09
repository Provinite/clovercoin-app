import { Repository } from "typeorm/repository/Repository.js";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { CommunityMember } from "./CommunityMember.js";

export class CommunityMemberController extends EntityController<
  CommunityMember,
  Repository<CommunityMember>,
  any
> {
  constructor({ communityMemberRepository }: AppGraphqlContext) {
    super(communityMemberRepository);
  }
}
