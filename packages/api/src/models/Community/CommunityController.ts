import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Community } from "./Community.js";

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
