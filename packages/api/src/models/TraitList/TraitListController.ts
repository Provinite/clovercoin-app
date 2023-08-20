import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Variant } from "./TraitList.js";

export type TraitListCreate = Pick<Variant, "speciesId" | "name">;
export type TraitListModify = Pick<
  Partial<Variant>,
  "name" | "traitListEntries"
>;
export class TraitListController extends EntityController<
  Variant,
  Repository<Variant>,
  TraitListCreate,
  TraitListModify
> {
  constructor({ traitListRepository }: AppGraphqlContext) {
    super(traitListRepository);
  }
}
