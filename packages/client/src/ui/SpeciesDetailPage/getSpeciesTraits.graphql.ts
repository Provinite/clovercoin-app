import gql from "graphql-tag";

export const getSpeciesTraitsQuery = gql`
  query getSpeciesTraits($filters: TraitFilters!) {
    traits(filters: $filters) {
      id
      name
      enumValues {
        id
        name
      }
      valueType
    }
  }
`;
