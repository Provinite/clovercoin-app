import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../utils/error-fragments/BaseErrorFragment.graphql";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";
import NotAuthenticatedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql";

export const deleteTraitMutation = gql`
  mutation deleteTrait($input: TraitDeleteInput!) {
    deleteTrait(input: $input) {
      __typename
      ... on DeleteResponse {
        ok
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentGraphql}
  ${BaseErrorFragmentGraphql}
  ${NotAuthenticatedErrorFragmentGraphql}
`;
