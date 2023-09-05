import gql from "graphql-tag";

export const getInviteCodeListQuery = gql`
  query getInviteCodeList($filters: InviteCodeFilters!) {
    inviteCodes(filters: $filters) {
      __typename
      ... on InviteCodeList {
        list {
          role {
            name
            id
          }
          claimCount
          id
          maxClaims
          creator {
            displayName
          }
        }
      }
    }
  }
`;
