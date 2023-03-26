import gql from "graphql-tag";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";

export const getSpeciesDetailQuery = gql`
  query getSpeciesDetail($filters: SpeciesFilters) {
    __typename
    species(filters: $filters) {
      ... on SpeciesList {
        list {
          id
          name
          traitLists {
            id
            name
            enumValueSettings {
              id
              traitListId
              enumValueId
            }
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
  ${InvalidArgumentErrorFragmentGraphql}
`;
