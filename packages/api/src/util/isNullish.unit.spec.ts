import { isNullish } from "./isNullish.js";

describe("util:isNullish", () => {
  it.each([null, undefined])("returns true for %p", (val) => {
    expect(isNullish(val)).toBe(true);
  });
  it.each([1, 0, "", "false", false, {}, []])("returns false for %p", (val) => {
    expect(isNullish(val)).toBe(false);
  });
});
