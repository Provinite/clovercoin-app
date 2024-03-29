import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { TraitController } from "../Trait/TraitController.js";
import { TraitListEntry } from "./TraitListEntry.js";
import { SetOptional } from "type-fest";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";

export interface TraitListEntryCreate
  extends SetOptional<
    Pick<
      TraitListEntry,
      "traitId" | "speciesVariantId" | "order" | "valueType" | "required"
    >,
    "valueType"
  > {}

type ModifiableKeys = "order" | "required";
export interface TraitListEntryUpdate
  extends Partial<Pick<TraitListEntry, ModifiableKeys>> {}
/**
 * Controller for managing {@link TraitListEntry}
 */
export class TraitListEntryController extends EntityController<
  TraitListEntry,
  Repository<TraitListEntry>,
  TraitListEntryCreate,
  TraitListEntryUpdate
> {
  #traitController: TraitController;
  constructor({
    traitListEntryRepository,
    traitController,
    transactionProvider,
  }: AppGraphqlContext) {
    super(traitListEntryRepository, transactionProvider);
    this.#traitController = traitController;
  }

  async createBodyToModel(
    createBody: TraitListEntryCreate
  ): Promise<TraitListEntry> {
    // PERF: Some form of caching might be a good idea here
    const trait = await this.#traitController.findOneById(createBody.traitId);
    if (!trait) {
      const result = new InvalidArgumentError("Trait does not exist");
      result.validationErrors.push({
        constraints: [{ description: "Trait must exist", key: "traitId" }],
        field: "traitId",
      });
      throw result;
    }
    return super.createBodyToModel({
      ...createBody,
      valueType: trait.valueType,
    });
  }
}
