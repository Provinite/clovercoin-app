import { asClass } from "awilix";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { createTestContainer } from "../../test/createTestContainer.js";
import { AuthScope } from "./AuthInfo.js";
import { GlobalAuthorizer } from "./GlobalAuthorizer.js";
import { NotAuthenticatedError } from "./NotAuthenticatedError.js";
import { NotAuthorizedError } from "./NotAuthorizedError.js";

describe("class:GlobalAuthorizer", () => {
  describe("method:authorize", () => {
    it("throws NotAuthenticatedError when not authenticated", () => {
      const authorizer = setupAuthorizer(null);
      expect(() =>
        authorizer.authorize({ permissions: [], scope: AuthScope.Global })
      ).toThrow(NotAuthenticatedError);
    });
    it("throws NotAuthorizedError when scope is not global", () => {
      const authorizer = setupAuthorizer({});
      expect(() =>
        authorizer.authorize({
          permissions: [],
          scope: AuthScope.Critter as any,
        })
      ).toThrow(NotAuthorizedError);
    });
    it("throws NotAuthorizedError when missing permissions", () => {
      const authorizer = setupAuthorizer({
        canCreateCommunity: false,
      });
      expect(() =>
        authorizer.authorize({
          permissions: ["canCreateCommunity"],
          scope: AuthScope.Global,
        })
      ).toThrow(NotAuthorizedError);
    });
    it("requires all permissions", () => {
      const principal: Partial<AppGraphqlContext["principal"]> = {
        canCreateCommunity: true,
        canCreateInviteCode: false,
      };
      const authorizer = setupAuthorizer(principal);
      const permCheck = () =>
        authorizer.authorize({
          permissions: ["canCreateCommunity", "canCreateInviteCode"],
          scope: AuthScope.Global,
        });

      expect(permCheck).toThrow(NotAuthorizedError);
      principal.canCreateInviteCode = true;
      expect(permCheck).not.toThrow();
    });
    it("does not throw when authorized", () => {
      const authorizer = setupAuthorizer({
        canCreateCommunity: true,
      });

      expect(() =>
        authorizer.authorize({
          permissions: ["canCreateCommunity"],
          scope: AuthScope.Global,
        })
      ).not.toThrow();
    });
  });
});

function setupAuthorizer(
  principal: Partial<AppGraphqlContext["principal"]>
): GlobalAuthorizer {
  return createTestContainer<AppGraphqlContext>({
    principal: principal as any,
  }).build(asClass(GlobalAuthorizer));
}
