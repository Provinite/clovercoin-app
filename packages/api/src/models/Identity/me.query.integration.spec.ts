import { v4 } from "uuid";
import { graphql } from "../../test/gql/gql.js";
import { getAdminUser } from "../../test/integration/integrationCache.js";
import { newTestClient } from "../../test/testClient.js";
describe("query:me", () => {
  const meQuery = graphql(`
    query meIntegrationQuery($roleFilters: IdentityRolesFilters!) {
      me {
        id
        roles(filters: $roleFilters) {
          __typename
          ... on RoleList {
            list {
              id
              communityId
            }
          }
        }
      }
    }
  `);

  const createCommunityQuery = graphql(`
    mutation createCommunity($input: CommunityCreateInput!) {
      createCommunity(input: $input) {
        __typename
        ... on Community {
          id
        }
      }
    }
  `);

  it("returns the logged in user", async () => {
    const community = await createCommunity();

    const result = await newTestClient.request(meQuery, {
      roleFilters: { communityId: community.id },
    });

    expect(result.me.roles.__typename).toBe("RoleList");
    expect(result.me.id).toBe(getAdminUser().identity.id);
  });
  describe("field: roles", () => {
    it("returns roles filtered by community id", async () => {
      // give the admin user memberships in several other communities
      const [community] = await Promise.all(
        Array.from({ length: 3 }, () => createCommunity())
      );

      const result = await newTestClient.request(meQuery, {
        roleFilters: { communityId: community.id },
      });

      if (result.me.roles.__typename !== "RoleList") {
        throw new Error(`Failed to fetch roles`);
      }
      for (const role of result.me.roles.list) {
        expect(role.communityId).toBe(community.id);
      }
    });
  });

  const createCommunity = async (name = v4()) => {
    const community = await newTestClient.request(createCommunityQuery, {
      input: {
        name,
      },
    });

    if (community.createCommunity.__typename !== "Community") {
      throw new Error(`Failed to create community`);
    }

    return community.createCommunity;
  };
});
