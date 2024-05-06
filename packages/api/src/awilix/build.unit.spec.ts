import { asValue, createContainer } from "awilix";
import { build } from "./build.js";

describe("awilix:build", () => {
  it("builds the function", () => {
    const container = createContainer<{ foo: string }>();
    container.register("foo", asValue("bar"));

    const result = build(container, ({ foo }) => foo);

    expect(result).toBe("bar");
  });
  it("offers enhanced type safety", () => {
    const container = createContainer<{ foo: string }>();
    // @ts-expect-error bar isn't on the container type
    build(container, ({ bar }) => bar);

    const result = build(container, ({ foo }) => foo);

    assert<string>(result, "string");
    expect(() =>
      // @ts-expect-error it's not typed as a number
      assert<number>(result, "number")
    ).toThrow();
  });
});
function assert<T>(val: T, type: string) {
  expect(typeof val).toBe(type);
}
