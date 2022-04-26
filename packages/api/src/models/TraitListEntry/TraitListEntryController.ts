import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { TraitListEntry } from "./TraitListEntry";

export type TraitListEntryCreate = Pick<
  TraitListEntry,
  "traitId" | "traitListId" | "order" | "valueType" | "speciesId"
>;

export class TraitListEntryController extends EntityController<
  TraitListEntry,
  Repository<TraitListEntry>,
  any
> {
  constructor({ traitListEntryRepository }: AppGraphqlContext) {
    super(traitListEntryRepository);
  }
}
