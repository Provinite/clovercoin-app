import { asClass, asFunction, AwilixContainer, Lifetime } from "awilix";
import { Repository } from "typeorm";
import { register } from "../awilix/register";
import { TransactionProvider } from "../db/TransactionProvider";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext";
import { uncapitalize } from "../util/stringUtils";
import { ModelClassName, ModelsMap, ModelByName } from "./index";

/**
 * Register model repositories onto an awilix container
 * @param container
 */
export function registerRepositories(
  container: AwilixContainer<AppGraphqlContext>
) {
  register(
    container,
    "transactionProvider",
    asClass(TransactionProvider, { lifetime: Lifetime.TRANSIENT })
  );
  for (const [modelNameStr, modelClass] of Object.entries(ModelsMap)) {
    const modelName = modelNameStr as ModelClassName;
    const resolver = ({ entityManager }: AppGraphqlContext) => {
      return entityManager.getRepository(modelClass);
    };
    register(
      container,
      getRepositoryName(modelName),
      asFunction(resolver).scoped()
    );
  }
}

/**
 * Get the name of a repository from a model name
 * @param modelName The name of a model, eg `Account`
 */
function getRepositoryName<T extends ModelClassName>(
  modelName: T
): RepositoryName<T> {
  return `${uncapitalize(modelName)}Repository`;
}

/**
 * Map of registrations added by registerRepositories
 */
export type RepositoryContext = {
  [key in RepositoryName]: Repository<ModelFromRepoName<key>>;
};

/**
 * Get repoistory name from model class name
 * @example
 * ```ts
 * type T = RepositoryName<"Account">; // T = "accountRepository"
 * ```
 */
export type RepositoryName<T extends ModelClassName = ModelClassName> =
  | Uncapitalize<`${T}Repository`>
  | `${Uncapitalize<T>}Repository`;

/**
 * Get model from from a repository name
 * @example
 * ```ts
 * type T = ModelFromRepoName<"accountRepository">; // T = Account
 * ```
 */
export type ModelFromRepoName<
  T extends `${Uncapitalize<ModelClassName>}Repository`
> = T extends `${infer R}Repository`
  ? Capitalize<R> extends ModelClassName
    ? ModelByName[Capitalize<R>]
    : never
  : never;
