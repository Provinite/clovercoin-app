import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { CommunityMember } from "./CommunityMember";

export class CommunityMemberController extends EntityController<
  CommunityMember,
  Repository<CommunityMember>,
  any
> {
  constructor({ communityMemberRepository }: AppGraphqlContext) {
    super(communityMemberRepository);
  }
}
