import gql from "graphql-tag";

export const getInviteCodeListQuery = gql`
  query getInviteCodeList {
    inviteCodes {
      __typename
      ... on InviteCodeList {
        list {
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
