import { AuthScope } from "../AuthInfo.js";
import { isAuthenticated } from "./isAuthenticated.js";

describe("business:auth:authorizationInfoGenerators:isAuthenticated", () => {
  it("generates an auth info specifier", () => {
    const authInfo = isAuthenticated()(null!);
    expect(authInfo).toEqual({
      scope: AuthScope.Global,
      permissions: [],
    });
  });
});
