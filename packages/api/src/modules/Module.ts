import {
  asClass,
  asFunction,
  AwilixContainer,
  BuildResolver,
  LifetimeType,
} from "awilix";
import { Class } from "type-fest";
import { createContainer } from "../awilix/createContainer.js";
import { register } from "../awilix/register.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { assertNever } from "../util/assertNever.js";
import { AppInstance } from "./AppInstance.js";

export class Module<
  ContextType extends object = AppGraphqlContext,
  ProvidesKeys extends keyof ContextType = keyof ContextType
> {
  /**
   * This flag is set to true once this module and all of its
   * dependencies have been initialized.
   */
  private isInitialized = false;

  /**
   * This flag is set to true while the module is waiting for its
   * dependencies to initialize. This is used to detect circular
   * dependencies.
   *
   * This flag is false before and after the module is initialized.
   */
  private isPendingInitialization = false;

  /**
   * Instantiated modules this module depends upon
   */
  public imports: Module<ContextType, any>[] = [];

  /**
   * Private constructor. Using modules is done through the static
   * {@link Module.define} method, and the {@link AppInstance} class.
   * @param options
   */
  private constructor(
    /**
     * Original module options this instance was created from
     */
    public readonly options: ModuleOptions<ContextType, ProvidesKeys>
  ) {}

  /**
   * Create a module definition. These should be treated as
   * stateless singletons used to reference another module and
   * pull it into this module's dependency tree.
   * @param options Module options
   * @returns The module definition
   */
  public static define<
    ContextType extends object,
    K extends keyof ContextType = keyof ContextType
  >(options: ModuleOptions<ContextType, K>) {
    const result: typeof options & {
      instantiate: () => AppInstance<ContextType>;
    } = options as any;
    result.instantiate = () => new AppInstance(options);
    return result;
  }

  /**
   * Initialize this module and its dependencies.
   * @param container DI container to register entries to
   * @returns The container
   */
  initialize(
    container: AwilixContainer<ContextType> = createContainer<any>("root")
  ) {
    if (this.isInitialized) {
      throw new Error(`Module already initialized: ${this.options.name}}`);
    }
    this.isPendingInitialization = true;
    this.ensureDependenciesInitialized(container);
    this.registerOwnEntries(container);
    this.isInitialized = true;
    return container;
  }

  /**
   * Static factory method to create a module tree from a definition
   * tree. Instantiates all modules, but does not initialize them.
   * @param rootModuleDefinition Root module definition.
   * @returns The root module
   */
  static createRootModule<T extends object, K extends keyof T>(
    rootModuleDefinition: ModuleOptions<T, K>
  ): Module<T, K> {
    /**
     * Map of module definitions to module instances.
     */
    const cache: Map<ModuleOptions<any, any>, Module<any, any>> = new Map();
    /**
     * The module intance of our root module we're instantiating here
     */
    const rootModule = new Module(rootModuleDefinition);
    const moduleDefinitions = [...rootModuleDefinition.imports];

    // first pass, instantiate all module definitions into
    // cached Module instances
    while (moduleDefinitions.length) {
      const options = moduleDefinitions.pop()!;
      if (cache.has(options)) {
        // already instantiated, skip
        continue;
      }

      // instantiate the module and store it
      const module = new Module(options);
      cache.set(options, module);

      for (const importDef of options.imports) {
        moduleDefinitions.push(importDef);
      }
    }

    // second pass, set `imports` on the entire tree
    // replace all definition references with module shared
    // module instances
    for (const module of [rootModule, ...cache.values()]) {
      module.imports = module.options.imports.map(
        (importDef) =>
          cache.get(importDef) ??
          (() => {
            throw new Error("Module not found");
          })()
      );
    }

    return rootModule;
  }

  /**
   * Ensure that all dependencies of this module are initialized.
   * @param container DI container to register entries to
   * @note Recursively initializes dependencies via `initialize` method
   * @throws {Error} if a circular dependency is detected
   */
  protected ensureDependenciesInitialized(
    container: AwilixContainer<ContextType>
  ) {
    for (const module of this.imports) {
      if (!module.isInitialized) {
        if (module.isPendingInitialization) {
          throw new Error(
            `Circular dependency detected. Module ${this.options.name} < - > ${module.options.name}`
          );
        }
        module.initialize(container);
      }
    }
  }

  /**
   * Register this module's own entries to the DI container.
   * @param container DI container to register entries to
   */
  protected registerOwnEntries(container: AwilixContainer<ContextType>) {
    for (const [key, entry] of Object.entries<
      ModuleOptions<ContextType, ProvidesKeys>["entries"][ProvidesKeys]
    >(this.options.entries)) {
      if (!entry) {
        continue;
      }
      let resolver: BuildResolver<any>;
      if ("class" in entry) {
        resolver = asClass(entry.class);
      } else if ("factory" in entry) {
        resolver = asFunction(entry.factory);
      } else {
        assertNever(entry);
      }

      if (!resolver) {
        throw new Error(
          `Failed to register entry. Check entry configurations for module ${this.options.name} (entry: ${key})`
        );
      }

      resolver = resolver.setLifetime(entry.lifetime);
      register(container, key as keyof ContextType, resolver);
    }
  }
}

/**
 * Common options for all types of module entries
 */
interface ModuleEntryBase {
  lifetime: LifetimeType;
}

/**
 * A module entry registering a class
 */
interface ClassModuleEntry<
  ContextType extends object,
  Key extends keyof ContextType
> extends ModuleEntryBase {
  class: Class<ContextType[Key], [ContextType]>;
}
/**
 * A module entry registering a factory function
 */
interface FactoryModuleEntry<
  ContextType extends object,
  Key extends keyof ContextType
> extends ModuleEntryBase {
  factory: (ctx: ContextType) => ContextType[Key];
}

/**
 * Options for initializing a module.
 */
export interface ModuleOptions<
  ContextType extends object,
  ProvidesKeys extends keyof ContextType
> {
  name: string;
  imports: ModuleOptions<ContextType, any>[];
  entries: {
    [Key in ProvidesKeys]?: ModuleEntry<ContextType, Key>;
  };
}

/**
 * A single module entry, representing one registered injectable
 */
export type ModuleEntry<
  ContextType extends object,
  Key extends keyof ContextType
> = ClassModuleEntry<ContextType, Key> | FactoryModuleEntry<ContextType, Key>;
