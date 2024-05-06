import { createContainer } from "./createContainer.js";
import { v4 } from "uuid";

describe("awilix:createContainer", () => {
  it("registers container as itself", () => {
    const result = createContainer();
    expect(result.resolve("container")).toBe(result);
  });
  it("registers contextName as provided", () => {
    const mockName = v4();
    const result = createContainer(mockName);
    expect(result.resolve("contextName")).toBe(mockName);
  });
});
