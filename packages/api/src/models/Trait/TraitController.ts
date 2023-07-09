import { DeleteResult, Repository } from "typeorm/index.js";
import { EntityController } from "../../business/EntityController.js";
import { TransactionProvider } from "../../db/TransactionProvider.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Trait } from "./Trait.js";

export type TraitCreate = Pick<Trait, "name" | "valueType" | "speciesId">;
export type TraitModify = Pick<Partial<Trait>, "name" | "valueType">;

export class TraitController extends EntityController<
  Trait,
  Repository<Trait>,
  TraitCreate,
  TraitModify
> {
  #transactionProvider: TransactionProvider;
  constructor({ traitRepository, transactionProvider }: AppGraphqlContext) {
    super(traitRepository);
    this.#transactionProvider = transactionProvider;
  }

  /**
   * Delete a trait and its enum values.
   * @override
   * @param id
   */
  async deleteOneById(id: string): Promise<DeleteResult> {
    return this.#transactionProvider.runTransaction(
      async ({
        enumValueRepository,
        traitController,
        traitListEntryRepository,
      }) => {
        await enumValueRepository.delete({
          traitId: id,
        });
        await traitListEntryRepository.delete({ traitId: id });
        return super.deleteOneById.call(traitController, id);
      }
    );
  }
}
