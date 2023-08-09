import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "./utils/error-fragments/BaseErrorFragment.graphql";
import InvalidArgumentErrorFragmentGraphql from "./utils/error-fragments/InvalidArgumentErrorFragment.graphql";

export const getCrittersQuery = gql`
  query getCritters($filters: CritterFilters!) {
    critters(filters: $filters) {
      ... on CritterList {
        list {
          id
          name
          traitList {
            name
            id
          }
          traitValues {
            traitId
            value
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
  ${InvalidArgumentErrorFragmentGraphql}
  ${BaseErrorFragmentGraphql}
`;
