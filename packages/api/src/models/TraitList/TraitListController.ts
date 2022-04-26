import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { TraitList } from "./TraitList";

export type TraitListCreate = Pick<TraitList, "speciesId" | "name">;

export class TraitListController extends EntityController<
  TraitList,
  Repository<TraitList>,
  TraitListCreate
> {
  constructor({ traitListRepository }: AppGraphqlContext) {
    super(traitListRepository);
  }
}
