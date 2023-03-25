import { DeleteResult, Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { TransactionProvider } from "../../db/TransactionProvider";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Trait } from "./Trait";

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
