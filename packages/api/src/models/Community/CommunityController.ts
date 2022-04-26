import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Community } from "./Community";

export type CommunityCreate = Pick<Community, "name">;

export class CommunityController extends EntityController<
  Community,
  Repository<Community>,
  CommunityCreate
> {
  constructor({ communityRepository }: AppGraphqlContext) {
    super(communityRepository);
  }
}
