import { asValue } from "awilix";
import { createChildContainer } from "./createChildContainer.js";
import { createContainer } from "./createContainer.js";
describe("awilix:createChildContainer", () => {
  it("returns a child container", () => {
    const container = createContainer("parent");
    container.register("foo", asValue("bar"));
    const childContainer = createChildContainer<any>(container, "child");
    expect(childContainer.resolve("foo")).toBe("bar");
  });
  it("sets contextName", () => {
    const container = createContainer("parent");
    const childContainer = createChildContainer<any>(container, "child");
    expect(childContainer.resolve("contextName")).toBe("parent.child");
  });
  it("sets container", () => {
    const container = createContainer("parent");
    const childContainer = createChildContainer<any>(container, "child");
    expect(childContainer.resolve("container")).toBe(childContainer);
  });
  it("sets parentContainer", () => {
    const container = createContainer("parent");
    const childContainer = createChildContainer<any>(container, "child");
    expect(childContainer.resolve("parentContainer")).toBe(container);
  });
});
