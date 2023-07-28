import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { TraitList } from "./TraitList.js";

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
