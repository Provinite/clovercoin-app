import { AuthScope } from "./AuthInfo.js";
import { Authorizer } from "./Authorizer.js";

describe("class:Authorizer", () => {
  describe("method:register", () => {
    it("registers the authorizer with the registry", () => {
      class MockAuthorizer extends Authorizer<AuthScope.Global> {
        async authorize() {}
      }
      const registry = {
        registerAuthorizer: jest.fn(),
      };

      const authorizer = new MockAuthorizer(AuthScope.Global);
      authorizer.register(registry as any);
      expect(registry.registerAuthorizer).toHaveBeenCalledTimes(1);
      expect(registry.registerAuthorizer).toHaveBeenCalledWith(
        AuthScope.Global,
        authorizer
      );
    });
  });
});
