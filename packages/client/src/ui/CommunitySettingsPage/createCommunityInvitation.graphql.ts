import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../utils/error-fragments/BaseErrorFragment.graphql";
import DuplicateErrorFragmentGraphql from "../../utils/error-fragments/DuplicateErrorFragment.graphql";
import NotAuthenticatedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql";

export const createCommunityInvitationMutation = gql`
  mutation createCommunityInvitation($input: CommunityInvitationCreateInput!) {
    createCommunityInvitation(input: $input) {
      __typename
      ... on CommunityInvitation {
        id
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${DuplicateErrorFragmentGraphql}
  ${NotAuthenticatedErrorFragmentGraphql}
  ${BaseErrorFragmentGraphql}
`;
