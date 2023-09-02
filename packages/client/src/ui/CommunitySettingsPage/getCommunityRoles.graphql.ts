import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../utils/error-fragments/BaseErrorFragment.graphql";
import NotAuthenticatedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql";

export const getCommunityRolesQuery = gql`
  query getCommunityRoles($communityId: ID!) {
    community(filters: { id: $communityId }) {
      __typename
      ... on Community {
        roles {
          __typename
          id
          name
          canCreateCritter
          canCreateSpecies
          canEditCritter
          canEditSpecies
        }
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
  ${NotAuthenticatedErrorFragmentGraphql}
  ${BaseErrorFragmentGraphql}
`;
