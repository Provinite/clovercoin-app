import { asValue, createContainer } from "awilix";
import { register } from "./register.js";

describe("awilix:register", () => {
  it("registers an injectable in the container", () => {
    interface Cradle {
      foo: string;
    }
    const container = createContainer<Cradle>();
    register(container, "foo", asValue("bar"));
    expect(container.resolve("foo")).toBe("bar");
  });
});
