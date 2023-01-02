import { DeleteResult, Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { TraitController } from "../Trait/TraitController";
import { TraitListEntry } from "./TraitListEntry";
import { SetOptional } from "type-fest";
import { BaseError } from "../../errors/BaseError";

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

  /**
   * @override
   */
  async deleteOneById(_id: string): Promise<DeleteResult> {
    throw new BaseError("Method not implemented");
  }

  async createBodyToModel(
    createBody: TraitListEntryCreate
  ): Promise<TraitListEntry> {
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
