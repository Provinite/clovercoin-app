import type { AwilixContainer } from "awilix";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { CommunityAuthorizer } from "../../models/Community/CommunityAuthorizer.js";
import { CritterAuthorizer } from "../../models/Critter/CritterAuthorizer.js";
import { createTestContainer } from "../../test/createTestContainer.js";
import { AuthScope } from "./AuthInfo.js";
import { AuthorizerRegistry } from "./AuthorizerRegistry.js";
import { Authorizers } from "./Authorizers.js";
jest.mock("awilix", () => ({
  ...jest.requireActual("awilix"),
  asClass: (clazz: any) => clazz,
}));

jest.mock("./Authorizers.js", () => ({
  Authorizers: {
    CritterAuthorizer: class CritterAuthorizer {},
    CommunityAuthorizer: class CommunityAuthorizer {},
  },
}));

let mockContainer: jest.Mocked<AwilixContainer>;
let mockCritterAuthorizer: jest.Mocked<CritterAuthorizer>;
let mockCommunityAuthorizer: jest.Mocked<CommunityAuthorizer>;
beforeEach(() => {
  mockContainer = {
    build: jest.fn(),
  } as any;

  mockCritterAuthorizer = {
    register: jest.fn(),
  } as any;
  mockCommunityAuthorizer = {
    register: jest.fn(),
  } as any;

  mockContainer.build.mockImplementation((clazz) => {
    if (clazz === Authorizers.CritterAuthorizer) {
      return mockCritterAuthorizer;
    } else if (clazz === Authorizers.CommunityAuthorizer) {
      return mockCommunityAuthorizer;
    }
    throw new Error("Unexpected class: " + clazz.name);
  });
});

describe("class:AuthorizerRegistry", () => {
  describe("constructor", () => {
    it("registers known authorizers", () => {
      const registry = setupRegistry();
      expect(mockCritterAuthorizer.register).toHaveBeenCalledWith(registry);
      expect(mockCommunityAuthorizer.register).toHaveBeenCalledWith(registry);
      expect(mockContainer.build).toHaveBeenCalledTimes(2);
    });
  });
  describe("with registry", () => {
    let registry: AuthorizerRegistry;
    beforeEach(() => {
      registry = setupRegistry();
    });
    describe("method:registerAuthorizer", () => {
      it("registers an authorizer", () => {
        const authorizer = {} as any;
        registry.registerAuthorizer(AuthScope.Global, authorizer);
        expect(registry.getAuthorizer(AuthScope.Global)).toBe(authorizer);
      });
      it("errors on duplicate authorizers", () => {
        const authorizer = {} as any;
        registry.registerAuthorizer(AuthScope.Global, authorizer);
        expect(() =>
          registry.registerAuthorizer(AuthScope.Global, authorizer)
        ).toThrowErrorMatchingInlineSnapshot(
          `"Duplicate authorizer registered for scope: 1: Global"`
        );
      });
    });
    describe("method:getAuthorizer", () => {
      it("returns the authorizer", () => {
        const authorizer = {} as any;
        registry.registerAuthorizer(AuthScope.Global, authorizer);
        expect(registry.getAuthorizer(AuthScope.Global)).toBe(authorizer);
      });
      it("errors on missing authorizer", () => {
        expect(() =>
          registry.getAuthorizer(AuthScope.Global)
        ).toThrowErrorMatchingInlineSnapshot(`"Error during authorization"`);
      });
    });
  });
});

function setupRegistry() {
  const testCtx = createTestContainer<AppGraphqlContext>({
    authorizerRegistry: AuthorizerRegistry,
    container: mockContainer,
  });

  return testCtx.resolve("authorizerRegistry");
}
