import { ResolverData } from "type-graphql";
import { AuthScope } from "../AuthInfo.js";
import { NotAuthorizedError } from "../NotAuthorizedError.js";
import { hasCommunityPerms } from "./hasCommunityPerms.js";

describe("business:auth:authorizationInfoGenerators:hasCommunityPerms", () => {
  it("generates a community auth info specifier", () => {
    const communityId = "mock-community-id";
    const mockResolverData: ResolverData<any> = {
      args: {
        input: {
          communityId,
        },
      },
      context: {},
      info: null!,
      root: null,
    };
    const authInfo = hasCommunityPerms(["canCreateInviteCode"])(
      mockResolverData
    );
    expect(authInfo).toEqual({
      scope: AuthScope.Community,
      communityId,
      permissions: ["canCreateInviteCode"],
    });
  });
  it.each([undefined, null, 123, "", {}])(
    "throws an unauthorizedError when communityId is %p",
    (communityId) => {
      const mockResolverData: ResolverData<any> = {
        args: {
          input: {
            communityId,
          },
        },
        context: {},
        info: null!,
        root: null,
      };
      expect(() => hasCommunityPerms()(mockResolverData)).toThrow(
        NotAuthorizedError
      );
    }
  );
});
