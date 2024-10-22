import { ensureArray } from "./ensureArray.js";

describe("util:ensurArray", () => {
  it("returns the argument if it is an array", () => {
    const input = ["foo", "bar"];
    expect(ensureArray(input)).toBe(input);
  });
  it("returns an array containing the argument if it is not an array", () => {
    const input = "foo";
    expect(ensureArray(input)).toEqual(["foo"]);
  });
});
