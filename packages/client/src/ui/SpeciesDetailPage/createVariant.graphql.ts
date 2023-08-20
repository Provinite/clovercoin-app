import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../utils/error-fragments/BaseErrorFragment.graphql";
import DuplicateErrorFragmentGraphql from "../../utils/error-fragments/DuplicateErrorFragment.graphql";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";

export const createVariantMutation = gql`
  mutation createVariant($input: SpeciesVariantCreateInput!) {
    createTraitList(input: $input) {
      ... on SpeciesVariant {
        id
        name
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentGraphql}
  ${DuplicateErrorFragmentGraphql}
  ${BaseErrorFragmentGraphql}
`;
