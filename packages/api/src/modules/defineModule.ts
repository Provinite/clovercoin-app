import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { ModuleOptions } from "./Module.js";

export function defineModule<
  ContextType extends object = AppGraphqlContext,
  ProvidedKeys extends keyof ContextType = keyof ContextType
>(options: ModuleOptions<ContextType, ProvidedKeys>) {
  return options;
}
