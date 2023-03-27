import { objectMap } from "./objectMap";

describe("util:objectMap", () => {
  it.each([
    [
      { one: "1", two: "2", three: "3" },
      { one: 1, two: 2, three: 3 },
      (v: any) => Number(v),
    ],
    [{}, {}, () => null],
  ])("maps over an object %p => %p", (input, output, fn) => {
    expect(objectMap(input, fn)).toEqual(output);
  });

  it("does not mutate its input", () => {
    const input = { this: "object", wont: "change" };
    const originalInput = { ...input };
    const result = objectMap(input, () => null);
    expect(input).toEqual(originalInput);
    expect(result).not.toBe(input);
  });
});
