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
});
