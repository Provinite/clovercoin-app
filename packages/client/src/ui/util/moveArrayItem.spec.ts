import { moveArrayItem } from "./moveArrayItem";

describe("moveArrayItem", () => {
  let arr: number[];
  beforeEach(() => {
    arr = [0, 1, 2, 3, 4];
  });
  it("moves an array item forward", () => {
    moveArrayItem(arr, 1, 2);
    expect(arr).toEqual([0, 2, 1, 3, 4]);
  });
  it("moves an array item backward", () => {
    moveArrayItem(arr, 2, 1);
    expect(arr).toEqual([0, 2, 1, 3, 4]);
  });
  it("moves an array item to the end of the array", () => {
    moveArrayItem(arr, 0, 4);
    expect(arr).toEqual([1, 2, 3, 4, 0]);
  });
  it("moves an array item to the beginning of the array", () => {
    moveArrayItem(arr, 4, 0);
    expect(arr).toEqual([4, 0, 1, 2, 3]);
  });
});
