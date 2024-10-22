import { ResolverData } from "type-graphql";
import { AuthScope } from "../AuthInfo.js";
import { hasGlobalPerms } from "./hasGlobalPerms.js";

describe("business:auth:authorizationInfoGenerators:hasGlobalPerms", () => {
  it.each([
    "canCreateCommunity",
    ["canCreateCommunity", "canCreateInviteCode"],
  ])("generates a global auth info specifier (%p)", () => {
    const mockResolverData: ResolverData<any> = {
      args: {},
      context: {},
      info: null!,
      root: null,
    };
    const authInfo = hasGlobalPerms(["canCreateCommunity"])(mockResolverData);
    expect(authInfo).toEqual({
      scope: AuthScope.Global,
      permissions: ["canCreateCommunity"],
    });
  });
});
