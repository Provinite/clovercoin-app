import { AwilixContainer } from "awilix";
import { ResolverData } from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { createTestContainer } from "../../test/createTestContainer.js";
import { getError } from "../../test/getError.js";
import {
  AuthScope,
  CommunityAuthInfo,
  CompoundAuthInfo,
  GlobalAuthInfo,
} from "./AuthInfo.js";
import { Authorizer } from "./Authorizer.js";
import { AuthorizerRegistry } from "./AuthorizerRegistry.js";
import { runAuthorizationOrThrow } from "./runAuthorization.js";

jest.mock("./Authorizers.js", () => ({ Authorizers: {} }));

describe("runAuthorization", () => {
  let container: AwilixContainer<AppGraphqlContext>;
  let registry: AuthorizerRegistry;
  let mockGlobalAuthorizer: Authorizer<AuthScope.Global>;
  let mockCommunityAuthorizer: Authorizer<AuthScope.Community>;
  let mockResolverData: ResolverData<AppGraphqlContext>;
  beforeEach(() => {
    container = createTestContainer<AppGraphqlContext>({
      authorizerRegistry: AuthorizerRegistry,
    });
    registry = container.resolve("authorizerRegistry");
    mockGlobalAuthorizer = {
      authorize: jest.fn(),
      register: jest.fn(),
      scope: AuthScope.Global,
    };
    mockCommunityAuthorizer = {
      authorize: jest.fn(),
      register: jest.fn(),
      scope: AuthScope.Community,
    };
    registry.registerAuthorizer(AuthScope.Global, mockGlobalAuthorizer);
    registry.registerAuthorizer(AuthScope.Community, mockCommunityAuthorizer);
    mockResolverData = {
      context: container.cradle,
      args: {},
      info: null!,
      root: null!,
    };
  });
  describe("runAuthorizationOrThrow", () => {
    const globalAuthInfo: GlobalAuthInfo = {
      scope: AuthScope.Global,
      permissions: ["canCreateCommunity"],
    };
    const communityAuthInfo: CommunityAuthInfo = {
      scope: AuthScope.Community,
      permissions: ["canCreateCritter"],
      communityId: "123",
    };
    describe.each([true, false])("simple auth info (fn: %p)", (fn) => {
      it("runs the global authorizer for global auth", async () => {
        await runAuthorizationOrThrow(
          fn ? () => globalAuthInfo : globalAuthInfo,
          mockResolverData
        );
        expect(mockCommunityAuthorizer.authorize).not.toHaveBeenCalled();
        expect(mockGlobalAuthorizer.authorize).toHaveBeenCalledTimes(1);
        expect(mockGlobalAuthorizer.authorize).toHaveBeenCalledWith(
          globalAuthInfo
        );
      });
      it("runs the community authorizer for community auth", async () => {
        await runAuthorizationOrThrow(
          fn ? () => communityAuthInfo : communityAuthInfo,
          mockResolverData
        );
        expect(mockGlobalAuthorizer.authorize).not.toHaveBeenCalled();
        expect(mockCommunityAuthorizer.authorize).toHaveBeenCalledTimes(1);
        expect(mockCommunityAuthorizer.authorize).toHaveBeenCalledWith(
          communityAuthInfo
        );
      });
    });
    describe("compound auth info", () => {
      describe("anyOf", () => {
        it("short circuits on first success", async () => {
          const authInfo: CompoundAuthInfo = {
            kind: "anyOf",
            authInfos: [globalAuthInfo, communityAuthInfo],
          };
          await runAuthorizationOrThrow(authInfo, mockResolverData);
          expect(mockGlobalAuthorizer.authorize).toHaveBeenCalled();
          expect(mockCommunityAuthorizer.authorize).not.toHaveBeenCalled();
        });
        it("passes if one passes", async () => {
          jest
            .spyOn(mockGlobalAuthorizer, "authorize")
            .mockRejectedValue(new Error("globalError"));

          const authInfo: CompoundAuthInfo = {
            kind: "anyOf",
            authInfos: [globalAuthInfo, communityAuthInfo],
          };

          await runAuthorizationOrThrow(authInfo, mockResolverData);
          expect(mockGlobalAuthorizer.authorize).toHaveBeenCalled();
          expect(mockCommunityAuthorizer.authorize).toHaveBeenCalled();
        });
        it("fails if all fail, throwing the first error", async () => {
          jest
            .spyOn(mockCommunityAuthorizer, "authorize")
            .mockRejectedValue(new Error("communityError"));

          jest
            .spyOn(mockGlobalAuthorizer, "authorize")
            .mockRejectedValue(new Error("globalError"));

          const authInfo: CompoundAuthInfo = {
            kind: "anyOf",
            authInfos: [globalAuthInfo, communityAuthInfo],
          };
          const error = await getError(() =>
            runAuthorizationOrThrow(authInfo, mockResolverData)
          );
          expect(mockGlobalAuthorizer.authorize).toHaveBeenCalled();
          expect(mockCommunityAuthorizer.authorize).toHaveBeenCalled();
          expect(error).toMatchInlineSnapshot(`[Error: globalError]`);
        });
        it("disregards auth info specifiers that disable themselves", async () => {
          const authInfo: CompoundAuthInfo = {
            kind: "anyOf",
            authInfos: [
              () => null,
              () => null,
              () => null,
              globalAuthInfo,
              communityAuthInfo,
            ],
          };
          await runAuthorizationOrThrow(authInfo, mockResolverData);
          expect(mockGlobalAuthorizer.authorize).toHaveBeenCalled();
          expect(mockCommunityAuthorizer.authorize).not.toHaveBeenCalled();
        });
      });
      describe("allOf", () => {
        it("fails and short circuits on the first failure", async () => {
          const mockError = new Error("globalError");
          const authInfo: CompoundAuthInfo = {
            kind: "allOf",
            authInfos: [globalAuthInfo, communityAuthInfo],
          };
          jest
            .spyOn(mockGlobalAuthorizer, "authorize")
            .mockRejectedValue(mockError);
          await expect(
            runAuthorizationOrThrow(authInfo, mockResolverData)
          ).rejects.toBe(mockError);
          expect(mockGlobalAuthorizer.authorize).toHaveBeenCalled();
          expect(mockCommunityAuthorizer.authorize).not.toHaveBeenCalled();
        });
        it("passes if all pass", async () => {
          const authInfo: CompoundAuthInfo = {
            kind: "allOf",
            authInfos: [globalAuthInfo, communityAuthInfo],
          };

          await runAuthorizationOrThrow(authInfo, mockResolverData);
          expect(mockGlobalAuthorizer.authorize).toHaveBeenCalled();
          expect(mockCommunityAuthorizer.authorize).toHaveBeenCalled();
        });
        it("disregards auth info specifiers that disable themselves", async () => {
          const authInfo: CompoundAuthInfo = {
            kind: "allOf",
            authInfos: [
              () => null,
              () => null,
              () => null,
              globalAuthInfo,
              communityAuthInfo,
            ],
          };
          await runAuthorizationOrThrow(authInfo, mockResolverData);
          expect(mockGlobalAuthorizer.authorize).toHaveBeenCalled();
          expect(mockCommunityAuthorizer.authorize).toHaveBeenCalled();
        });
      });
    });
  });
});
