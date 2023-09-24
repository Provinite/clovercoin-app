import gql from "graphql-tag";
import NotAuthenticatedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql.js";

export const getIdentityListQuery = gql`
  query getIdentityList {
    identities {
      ... on IdentityList {
        list {
          displayName
          email
          id
          canCreateCommunity
          canCreateInviteCode
          canListIdentities
          canListInviteCodes
          canGrantGlobalPermissions
        }
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${NotAuthenticatedErrorFragmentGraphql}
`;
