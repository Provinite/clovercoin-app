import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../utils/error-fragments/BaseErrorFragment.graphql";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";
import NotAuthenticatedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql";

export const answerCommunityInvitationMutation = gql`
  mutation answerCommunityInvitation($input: CommunityInvitationAnswerInput!) {
    answerInvitation(input: $input) {
      __typename
      ... on CommunityInvitation {
        id
        accepted
        declined
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
  ${BaseErrorFragmentGraphql}
  ${NotAuthenticatedErrorFragmentGraphql}
  ${InvalidArgumentErrorFragmentGraphql}
`;
