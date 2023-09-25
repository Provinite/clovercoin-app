import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../../utils/error-fragments/BaseErrorFragment.graphql";
import InvalidArgumentErrorFragmentGraphql from "../../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";
import NotAuthenticatedErrorFragmentGraphql from "../../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql";

export const deleteCommunityMemberMutation = gql`
  mutation deleteCommunityMember($input: CommunityMemberDeleteInput!) {
    deleteCommunityMember(input: $input) {
      __typename
      ... on DeleteResponse {
        ok
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
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
