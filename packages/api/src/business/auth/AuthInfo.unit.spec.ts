import { AuthScope, isCompoundAuthInfo } from "./AuthInfo.js";

describe("AuthInfo", () => {
  describe("isCompoundAuthInfo", () => {
    it("returns true for an anyOf specifier", () => {
      expect(isCompoundAuthInfo({ kind: "anyOf", authInfos: [] })).toBe(true);
    });
    it("returrns true for an allOf specifier", () => {
      expect(isCompoundAuthInfo({ kind: "allOf", authInfos: [] })).toBe(true);
    });
    it("returns false for a non compound auth info", () => {
      expect(
        isCompoundAuthInfo({
          scope: AuthScope.Global,
          permissions: [],
        })
      ).toBe(false);
    });
  });
});
