import { DeleteResult, Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import { TransactionProvider } from "../../db/TransactionProvider.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { EnumValue } from "./EnumValue.js";

export type EnumValueCreate =
  | Pick<EnumValue, "name" | "trait" | "order">
  | Pick<EnumValue, "name" | "traitId" | "order">;
export type EnumValueUpdate = Pick<EnumValue, "name" | "order">;

export class EnumValueController extends EntityController<
  EnumValue,
  Repository<EnumValue>,
  EnumValueCreate,
  EnumValueUpdate
> {
  #transactionProvider: TransactionProvider;
  constructor({ enumValueRepository, transactionProvider }: AppGraphqlContext) {
    super(enumValueRepository);
    this.#transactionProvider = transactionProvider;
  }

  async setEnumValuesForTrait(
    traitId: string,
    enumValues: { id?: string; name: string; order: number }[]
  ) {
    return this.#transactionProvider.runTransaction(
      async ({ enumValueController, logger }) => {
        const existingEnumValues = await enumValueController.find({ traitId });

        const newValueByName: Record<string, typeof enumValues[number]> = {};
        const newValueById: Record<string, typeof enumValues[number]> = {};
        const existingValueByName: Record<string, EnumValue> = {};
        const existingValueById: Record<string, EnumValue> = {};

        for (const enumValue of enumValues) {
          newValueByName[enumValue.name] = enumValue;
          if (enumValue.id) {
            newValueById[enumValue.id] = enumValue;
          }
        }

        for (const enumValue of existingEnumValues) {
          existingValueById[enumValue.id] = enumValue;
          existingValueByName[enumValue.name] = enumValue;
        }

        let i = 0;
        // adds and updates
        const updatePromises: Promise<EnumValue>[] = [];
        // deletes
        const deletePromises: Promise<DeleteResult>[] = [];
        // list of ids that have been modified
        const modified: Record<string, boolean> = {};
        const toCreate: typeof enumValues = [];
        // review incoming options to do updates and creates
        for (const enumOption of enumValues) {
          if (enumOption.id) {
            const existingEnumOption = existingValueById[enumOption.id];
            if (!existingEnumOption) {
              throw new Error(
                "Invalid enum option at position " +
                  i +
                  " during setEnumOptionsForTrait"
              );
            }
            if (
              existingEnumOption.name !== enumOption.name ||
              existingEnumOption.order !== enumOption.order
            ) {
              modified[enumOption.id] = true;
              logger.verbose({
                message: "Modifying enumValue",
                enumValue: existingEnumOption,
                newValue: enumOption,
              });

              updatePromises.push(
                enumValueController.updateOneById(enumOption.id, {
                  name: enumOption.name,
                  order: enumOption.order,
                })
              );
            }
          } else {
            toCreate.push(enumOption);
          }
          ++i;
        }

        for (const { name, order } of toCreate) {
          const existingEnumOption = existingValueByName[name];
          // if there's already a trait with this name
          // and we haven't modified it, then we can ignore this entry
          if (existingEnumOption && !modified[existingEnumOption.id]) {
            newValueByName[name].id = existingEnumOption.id;
            newValueById[existingEnumOption.id] = newValueByName[name];
          } else {
            logger.verbose({
              message: "Creating new enumValue",
              createBody: {
                name,
                traitId,
                order,
              },
            });
            // there is no existing trait with this name, or we modified
            // that trait's name during this same update.
            updatePromises.push(
              enumValueController.create({
                name,
                traitId,
                order,
              })
            );
          }
        }

        // find deletes
        for (const existingEnumOption of existingEnumValues) {
          if (!newValueById[existingEnumOption.id]) {
            logger.verbose({
              message: "Deleting enumValue",
              enumValue: existingEnumOption,
            });
            // this option exists in the db, but not in the new options
            // delete it
            deletePromises.push(
              enumValueController.deleteOneById(existingEnumOption.id)
            );
          }
        }

        await Promise.all([...updatePromises, ...deletePromises]);
      }
    );
  }
}
