import { AwilixContainer } from "awilix";
import { createContainer } from "../awilix/createContainer.js";
import { resolve, resolveMany } from "../awilix/resolve.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { Module, ModuleOptions } from "./Module.js";

export class AppInstance<ContextType extends object = AppGraphqlContext> {
  public container: AwilixContainer<ContextType>;
  private rootModule: Module<ContextType, any>;

  constructor(moduleDefinition: ModuleOptions<ContextType, any>) {
    this.rootModule = Module.createRootModule(moduleDefinition);
    this.container = createContainer<any>(`root`);
  }

  initialize() {
    this.rootModule.initialize(this.container);
    return this;
  }

  resolve<K extends keyof ContextType>(key: K): ContextType[K] {
    return resolve(this.container, key);
  }

  resolveMany<K extends (keyof ContextType)[]>(...keys: [...K]) {
    return resolveMany(this.container, ...keys);
  }
}
