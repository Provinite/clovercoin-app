import { asValue } from "awilix";
import { execute, GraphQLSchema } from "graphql";
import { gql as _gql } from "graphql-tag";
import {
  buildSchema,
  createUnionType,
  Field,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { register } from "../../awilix/register.js";
import { createTestContainer } from "../../test/createTestContainer.js";
import { Preauthorize } from "./Preauthorize.js";
import { NotAuthenticatedError } from "./NotAuthenticatedError.js";
import { errorHandlerMiddleware } from "../../graphql/middlewares/errorHandlerMiddleware.js";
import { createMockIdentity } from "../../models/Identity/Identity.mock.js";
import { hasGlobalPerms } from "./authorizationInfoGenerators/hasGlobalPerms.js";

describe("business:auth:Preauthorize", () => {
  describe("decorator", () => {
    @ObjectType()
    class SimpleResponse {
      @Field()
      result: string;

      constructor(result: string) {
        this.result = result;
      }
    }

    const SimpleAuthResponse = createUnionType({
      name: "SimpleAuthResponse",
      types: () => [SimpleResponse, NotAuthenticatedError],
    });

    @Resolver()
    class MockResolver {
      @Preauthorize()
      @Query(() => SimpleAuthResponse)
      async preauthNoArgs() {
        return new SimpleResponse("preauthNoArgs");
      }

      @Preauthorize(hasGlobalPerms(["canCreateCommunity"]))
      async preauthHasGlobalCanCreateCommunity() {}
    }

    const testQuery = (
      testFn: "preauthNoArgs" | "preauthHasGlobalCanCreateCommunity"
    ): any => _gql`
      query TestQuery {
        ${testFn} {
          __typename
          ... on SimpleResponse {
            result
          }
          ... on BaseError {
            message
          }
        }
      }
    `;

    let schema: GraphQLSchema;
    let container: ReturnType<typeof createTestContainer>;
    beforeEach(async () => {
      schema = await buildSchema({
        resolvers: [MockResolver],
        globalMiddlewares: [errorHandlerMiddleware],
      });
      container = createTestContainer({
        logger: { error: jest.fn() } as any,
      });
    });

    describe("with no args", () => {
      it("rejects if unauthenticated", async () => {
        register(container, "principal", asValue(null));
        const result = await execute({
          document: testQuery("preauthNoArgs"),
          schema,
          contextValue: container.cradle,
        });
        expect(result).toMatchInlineSnapshot(`
          {
            "data": {
              "preauthNoArgs": {
                "__typename": "NotAuthenticatedError",
                "message": "Not authenticated",
              },
            },
          }
        `);
      });

      it("allows any authenticated user", async () => {
        const principal = createMockIdentity({ globalAdminPermissions: false });
        register(container, "principal", asValue(principal));
        const result = await execute({
          document: testQuery("preauthNoArgs"),
          schema,
          contextValue: container.cradle,
        });
        expect(result).toMatchInlineSnapshot(`
          {
            "data": {
              "preauthNoArgs": {
                "__typename": "SimpleResponse",
                "result": "preauthNoArgs",
              },
            },
          }
        `);
      });
    });
  });
});
