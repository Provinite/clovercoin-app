import { createTestContainer } from "../../test/createTestContainer.js";
import { AuthInfo, AuthScope } from "./AuthInfo.js";
import { Authorizer } from "./Authorizer.js";
import { AuthorizerRegistry } from "./AuthorizerRegistry.js";

jest.mock("./Authorizers.js", () => ({ Authorizers: {} }));

describe("class:Authorizer", () => {
  describe("method:register", () => {
    it("registers itself", () => {
      const container = createTestContainer({
        authorizerRegistry: AuthorizerRegistry,
      });
      const registry = container.resolve("authorizerRegistry");

      class TestAuthorizer extends Authorizer<AuthScope> {
        authorize(
          _authInfo: { scope: AuthScope } & AuthInfo
        ): void | Promise<void> {}
      }

      const authorizer = new TestAuthorizer(AuthScope.Global);
      authorizer.register(registry);

      expect(registry.getAuthorizer(AuthScope.Global)).toBeInstanceOf(
        TestAuthorizer
      );
    });
  });
});
