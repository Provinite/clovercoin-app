import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { TraitController } from "../Trait/TraitController";
import { TraitListEntry } from "./TraitListEntry";
import { SetOptional } from "type-fest";

export type TraitListEntryCreate = SetOptional<
  Pick<
    TraitListEntry,
    "traitId" | "traitListId" | "order" | "valueType" | "required"
  >,
  "valueType"
>;

export class TraitListEntryController extends EntityController<
  TraitListEntry,
  Repository<TraitListEntry>,
  TraitListEntryCreate
> {
  #traitController: TraitController;

  constructor({
    traitListEntryRepository,
    traitController,
  }: AppGraphqlContext) {
    super(traitListEntryRepository);
    this.#traitController = traitController;
  }

  async createBodyToModel(
    createBody: TraitListEntryCreate
  ): Promise<TraitListEntry> {
    if (createBody.valueType) {
      return super.createBodyToModel(createBody);
    }
    const trait = await this.#traitController.findOneById(createBody.traitId);
    if (!trait) {
      throw new Error("Invalid trait id");
    }
    return super.createBodyToModel({
      ...createBody,
      valueType: trait.valueType,
    });
  }
}
