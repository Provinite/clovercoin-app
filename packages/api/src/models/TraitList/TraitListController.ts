import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { TraitList } from "./TraitList";

export type TraitListCreate = Pick<TraitList, "speciesId" | "name">;
export type TraitListModify = Pick<
  Partial<TraitList>,
  "name" | "traitListEntries"
>;
export class TraitListController extends EntityController<
  TraitList,
  Repository<TraitList>,
  TraitListCreate,
  TraitListModify
> {
  constructor({ traitListRepository }: AppGraphqlContext) {
    super(traitListRepository);
  }
}
