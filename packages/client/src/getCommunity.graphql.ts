import gql from "graphql-tag";

export const getCommunityQuery = gql`
  query getCommunity($filters: CommunityFilters!) {
    community(filters: $filters) {
      __typename
      ... on Community {
        id
        name
        roles {
          id
          name
        }
      }
      ... on NotFoundError {
        message
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
`;
