import gql from "graphql-tag";

export default gql`
  query getCommunityListView($filters: CommunityFilters!) {
    communities(filters: $filters) {
      __typename
      ... on CommunityList {
        list {
          id
          name
        }
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
`;
