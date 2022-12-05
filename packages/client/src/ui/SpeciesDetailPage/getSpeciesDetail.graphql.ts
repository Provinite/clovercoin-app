import gql from "graphql-tag";

export const getSpeciesDetailQuery = gql`
  query getSpeciesDetail($filters: SpeciesFilters) {
    species(filters: $filters) {
      ... on SpeciesList {
        list {
          id
          name
          traitLists {
            id
            name
            traitListEntries {
              id
              defaultDisplayValue
              order
              required
              trait {
                id
                name
                valueType
                enumValues {
                  id
                  name
                }
              }
            }
          }
        }
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
`;
