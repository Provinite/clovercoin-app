import { Lifetime } from "awilix";
import { BaseCradleType } from "../awilix/BaseCradleType.js";
import { resolve } from "../awilix/resolve.js";
import { AppInstance } from "./AppInstance.js";
import { Module } from "./Module.js";

describe("class:Module", () => {
  describe("module definition, registration", () => {
    interface TestContext extends BaseCradleType<TestContext> {
      service: MockService;
      serviceB: MockService;
    }
    class MockService {
      constructor(public ctx: TestContext) {}
    }
    it("registers a class", () => {
      const module = Module.define<TestContext>({
        name: "TestModule",
        entries: {
          service: {
            class: MockService,
            lifetime: Lifetime.SINGLETON,
          },
        },
        imports: [],
      });

      const { container } = module.instantiate().initialize();

      const service = resolve(container, "service");
      expect(service).toBeInstanceOf(MockService);
      expect(service.ctx === container.cradle).toBe(true);
      expect(container.getRegistration("service")?.lifetime).toBe(
        Lifetime.SINGLETON
      );
    });
    it("registers a factory", () => {
      const module = Module.define<TestContext>({
        name: "TestModule",
        entries: {
          service: {
            factory: (ctx) => new MockService(ctx),
            lifetime: Lifetime.TRANSIENT,
          },
        },
        imports: [],
      });

      const { container } = module.instantiate().initialize();

      const service = resolve(container, "service");
      expect(service).toBeInstanceOf(MockService);
      expect(service.ctx === container.cradle).toBe(true);
      expect(container.getRegistration("service")?.lifetime).toBe(
        Lifetime.TRANSIENT
      );
    });
    it("initializes itself and depenencies", () => {
      const ServiceModule = Module.define<TestContext>({
        name: "ServiceModule",
        entries: {
          service: {
            class: MockService,
            lifetime: Lifetime.SINGLETON,
          },
        },
        imports: [],
      });
      const RootModule = Module.define<TestContext>({
        name: "RootModule",
        imports: [ServiceModule],
        entries: {},
      });

      const { container } = new AppInstance(RootModule).initialize();

      expect(resolve(container, "service")).toBeInstanceOf(MockService);
      expect(container.getRegistration("service")?.lifetime).toBe(
        Lifetime.SINGLETON
      );
    });
    it("errors if circular dependencies are defined", () => {
      const ModuleA = Module.define<TestContext>({
        name: "ModuleA",
        entries: {
          service: {
            class: MockService,
            lifetime: Lifetime.SINGLETON,
          },
        },
        imports: [],
      });
      const ModuleB = Module.define<TestContext>({
        name: "ModuleB",
        entries: {
          service: {
            class: MockService,
            lifetime: Lifetime.SINGLETON,
          },
        },
        imports: [ModuleA],
      });

      ModuleA.imports.push(ModuleB);

      const RootModule = Module.define<TestContext>({
        name: "RootModule",
        imports: [ModuleA],
        entries: {},
      });

      expect(() =>
        RootModule.instantiate().initialize()
      ).toThrowErrorMatchingInlineSnapshot(
        `"Circular dependency detected. Module ModuleB < - > ModuleA"`
      );
    });
  });
});
