import gql from "graphql-tag";

export const getCommunityMemberListQuery = gql`
  query getCommunityMemberList($communityId: ID!) {
    community(filters: { id: $communityId }) {
      __typename
      ... on Community {
        members {
          __typename
          ... on IdentityList {
            list {
              id
              displayName
              roles(filters: { communityId: $communityId }) {
                __typename
                ... on RoleList {
                  list {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
