import gql from "graphql-tag";
import NotAuthorizedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthorizedErrorFragment.graphql";

export const getIdentityListQuery = gql`
  query getIdentityList {
    identities {
      ... on IdentityList {
        list {
          displayName
          email
          id
        }
      }
      ... on NotAuthorizedError {
        ...NotAuthorizedErrorFragment
      }
    }
  }
  ${NotAuthorizedErrorFragmentGraphql}
`;
