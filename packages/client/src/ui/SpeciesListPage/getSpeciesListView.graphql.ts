import gql from "graphql-tag";

export const getSpeciesListViewQuery = gql`
  query getSpeciesListView($name: String, $communityId: ID!) {
    species(filters: { name: $name, communityId: $communityId }) {
      __typename
      ... on SpeciesList {
        list {
          id
          name
          iconUrl
          variants {
            id
            name
            traitListEntries {
              id
              trait {
                name
                valueType
              }
              order
              required
              defaultDisplayValue
            }
          }
        }
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
`;
