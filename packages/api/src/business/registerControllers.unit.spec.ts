import { createContainer } from "awilix";
import { ControllersMap } from "./Controllers.js";
import { registerControllers } from "./registerControllers.js";

jest.mock("./Controllers.js", () => ({
  ControllersMap: {},
}));
describe("registerControllers", () => {
  const ControllersMapAsAny = ControllersMap as any;
  beforeEach(() => {
    for (const key of Object.keys(ControllersMap)) {
      delete ControllersMapAsAny[key];
    }
  });
  it("registers each controller with its uncapitalized name", () => {
    class MockController {}
    class AnotherMockController {}
    ControllersMapAsAny.MockController = MockController;
    ControllersMapAsAny.AnotherMockController = AnotherMockController;

    const container = createContainer();
    registerControllers(container);

    expect(container.resolve("mockController")).toBeInstanceOf(MockController);
    expect(container.resolve("anotherMockController")).toBeInstanceOf(
      AnotherMockController
    );
  });

  it("registers controllers scoped to the container", () => {
    class MockController {}
    ControllersMapAsAny.MockController = MockController;

    const parentContainer = createContainer();
    registerControllers(parentContainer);
    const childContainer = parentContainer.createScope();

    const p1 = parentContainer.resolve("mockController");
    const p2 = parentContainer.resolve("mockController");

    const c1 = childContainer.resolve("mockController");
    const c2 = childContainer.resolve("mockController");

    expect(p1).toBe(p2);
    expect(c1).toBe(c2);
    expect(p1).not.toBe(c1);
    registerControllers(parentContainer);
  });
});
