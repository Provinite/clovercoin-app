import { asValue } from "awilix";
import { DocumentNode, execute, GraphQLError, GraphQLSchema } from "graphql";
import { gql as _gql } from "graphql-tag";
import { buildSchema, Field, ObjectType, Query, Resolver } from "type-graphql";
import { register } from "../../awilix/register.js";
import { createTestContainer } from "../../test/createTestContainer.js";
import { allAuth, anyAuth, Preauthorize } from "./Preauthorize.js";
import { NotAuthenticatedError } from "./NotAuthenticatedError.js";
import { createMockIdentity } from "../../models/Identity/Identity.mock.js";
import { hasGlobalPerms } from "./authorizationInfoGenerators/hasGlobalPerms.js";
import { runAuthorizationOrThrow as _runAuthorizationOrThrow } from "./runAuthorization.js";
import type { Identity } from "../../models/Identity/Identity.js";
import { asMock } from "../../test/asMock.js";
import { AuthScope, CritterAuthInfo, GlobalAuthInfo } from "./AuthInfo.js";
const runAuthorizationOrThrow = asMock(_runAuthorizationOrThrow);
jest.mock("./runAuthorization.ts");

describe("business:auth:Preauthorize", () => {
  const canCreatecommunity: GlobalAuthInfo = {
    scope: AuthScope.Global,
    permissions: ["canCreateCommunity"],
  };
  const canEditOwnCritter = (): CritterAuthInfo => ({
    scope: AuthScope.Critter,
    critterId: "123",
    permissions: ["canEditOwn"],
  });
  describe("anyAuth", () => {
    it("returns a compound auth info with kind 'anyOf'", () => {
      const result = anyAuth(canCreatecommunity, canEditOwnCritter);
      expect(result).toEqual({
        kind: "anyOf",
        authInfos: [canCreatecommunity, canEditOwnCritter],
      });
    });
  });
  describe("allAuth", () => {
    it("returns a compound auth info with kind 'allOf'", () => {
      const result = allAuth(canCreatecommunity, canEditOwnCritter);
      expect(result).toEqual({
        kind: "allOf",
        authInfos: [canCreatecommunity, canEditOwnCritter],
      });
    });
  });
  describe("decorator", () => {
    let schema: GraphQLSchema;
    let container: ReturnType<typeof createTestContainer>;
    let principal: Identity | null;
    beforeEach(async () => {
      schema = await buildSchema({
        resolvers: [MockResolver],
      });
      container = createTestContainer({
        logger: { error: jest.fn() } as any,
      });
      principal = null;
    });

    describe("with no args", () => {
      describe("authenticated", () => {
        beforeEach(() => {
          principal = createMockIdentity({
            globalAdminPermissions: false,
          });
          register(container, "principal", asValue(principal));
        });
        it("resolves", async () => {
          const result = await execute({
            document: testQuery(TestQuery.preauthNoArgs),
            schema,
            contextValue: container.cradle,
          });
          assertSuccessfulResponse(result, TestQuery.preauthNoArgs);
        });
        it("doesn't invoke runAuthorization", async () => {});
      });
      describe("unauthenticated", () => {
        beforeEach(() => {
          register(container, "principal", asValue(null));
        });
        it("rejects", async () => {
          register(container, "principal", asValue(null));
          const result = await execute({
            document: testQuery(TestQuery.preauthNoArgs),
            schema,
            contextValue: container.cradle,
          });
          expect(getRootError(result.errors)).toBeInstanceOf(
            NotAuthenticatedError
          );
        });
      });
    });
    describe("with an auth info specifier", () => {
      let document: DocumentNode;
      beforeEach(() => {
        document = testQuery(TestQuery.preauthHasGlobalCanCreateCommunity);
      });
      describe("authenticated", () => {
        beforeEach(() => {
          principal = createMockIdentity();
          container.register("principal", asValue(principal));
        });
        it("defers to runAuthorizationOrThrow", async () => {
          await execute({
            document,
            schema,
            contextValue: { principal },
          });
          expect(runAuthorizationOrThrow).toHaveBeenCalledTimes(1);
          const [specifier, resolverData] =
            runAuthorizationOrThrow.mock.calls[0];
          if (typeof specifier !== "function") {
            throw new Error("Expected function specifier");
          }
          expect(specifier(resolverData)).toEqual(
            hasGlobalPerms(["canCreateCommunity"])(resolverData)
          );
          expect(resolverData.context).toEqual({ principal });
        });
        it("throws if runAuthorizationOrThrow throws", async () => {
          const mockError = new Error("mock error");
          runAuthorizationOrThrow.mockRejectedValue(mockError);
          const result = await execute({
            document,
            schema,
            contextValue: { principal },
          });

          expect(getRootError(result.errors)).toBe(mockError);
        });
      });
    });
  });
});

enum TestQuery {
  preauthNoArgs = "preauthNoArgs",
  preauthHasGlobalCanCreateCommunity = "preauthHasGlobalCanCreateCommunity",
}
@ObjectType()
class SimpleResponse {
  @Field()
  result: string;

  constructor(result: string) {
    this.result = result;
  }
}

@Resolver()
class MockResolver {
  @Preauthorize()
  @Query(() => SimpleResponse)
  async preauthNoArgs() {
    return new SimpleResponse("preauthNoArgs");
  }

  @Preauthorize(hasGlobalPerms(["canCreateCommunity"]))
  @Query(() => SimpleResponse)
  async preauthHasGlobalCanCreateCommunity() {
    return new SimpleResponse("canCreateCommunity");
  }
}

function testQuery(testFn: TestQuery) {
  return _gql`
  query TestQuery {
    ${testFn} {
      __typename
      ... on SimpleResponse {
        result
      }
    }
  }
`;
}

function assertSuccessfulResponse(result: any, query: TestQuery) {
  expect(result.errors).toBeUndefined();
  expect(result.data[query].result).toBe(query);
}

function getRootError<T extends Error>(
  error: T | undefined | readonly T[]
): Error | T | undefined {
  if (!error) {
    return error;
  }
  if (Array.isArray(error)) {
    if (error.length <= 1) {
      return getRootError(error[0]);
    }
    return new AggregateError(error.map((e) => getRootError(e)));
  }
  if (error instanceof Error) {
    if (error instanceof GraphQLError) {
      return getRootError(error.originalError);
    }
    return error;
  }
}
