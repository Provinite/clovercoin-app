import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../utils/error-fragments/BaseErrorFragment.graphql";
import NotAuthorizedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthorizedErrorFragment.graphql";

export const getSpeciesTraitsQuery = gql`
  query getSpeciesTraits($filters: TraitFilters!) {
    traits(filters: $filters) {
      ... on TraitList {
        list {
          id
          name
          enumValues {
            id
            name
          }
          valueType
        }
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on NotAuthorizedError {
        ...NotAuthorizedErrorFragment
      }
    }
  }
  ${BaseErrorFragmentGraphql}
  ${NotAuthorizedErrorFragmentGraphql}
`;
