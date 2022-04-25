import { getBytesInString } from "./stringUtils";

describe("stringUtils", () => {
  describe("getBytesInString", () => {
    it.each([
      ["test", 4],
      ["a", 1],
      ["😂", 4],
      ["😂😂", 8],
      ["👍😂👍😂👍😂👍😂", 32],
    ])("counts bytes %p = %p", (str, expectedCount) => {
      expect(getBytesInString(str)).toBe(expectedCount);
    });
  });
});
