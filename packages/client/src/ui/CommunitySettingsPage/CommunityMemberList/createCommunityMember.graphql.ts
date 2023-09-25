import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../../utils/error-fragments/BaseErrorFragment.graphql";
import InvalidArgumentErrorFragmentGraphql from "../../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";
import NotAuthenticatedErrorFragmentGraphql from "../../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql";

export const createCommunityMemberMutation = gql`
  mutation createCommunityMember($input: CommunityMemberCreateInput!) {
    createCommunityMember(input: $input) {
      __typename
      ... on CommunityMember {
        id
        identityId
        roleId
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
