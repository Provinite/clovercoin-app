import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../utils/error-fragments/BaseErrorFragment.graphql";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";
import NotAuthenticatedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql";

export const modifyIdentityMutation = gql`
  mutation modifyIdentity($input: IdentityModifyInput!) {
    modifyIdentity(input: $input) {
      __typename
      ... on Identity {
        canCreateCommunity
        canCreateInviteCode
        canGrantGlobalPermissions
        canListIdentities
        canListInviteCodes
        id
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${BaseErrorFragmentGraphql}
  ${InvalidArgumentErrorFragmentGraphql}
  ${NotAuthenticatedErrorFragmentGraphql}
`;
