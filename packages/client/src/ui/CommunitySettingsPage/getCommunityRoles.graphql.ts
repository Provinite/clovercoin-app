import gql from "graphql-tag";
import BaseErrorFragmentGraphql from "../../utils/error-fragments/BaseErrorFragment.graphql";
import NotAuthenticatedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql";
import { RolePermissionsFragmentGraphql } from "./RolePermissionsFragment.graphql";

export const getCommunityRolesQuery = gql`
  query getCommunityRoles($communityId: ID!) {
    community(filters: { id: $communityId }) {
      __typename
      ... on Community {
        roles {
          __typename
          id
          name
          ...RolePermissionsFragment
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
  ${RolePermissionsFragmentGraphql}
`;
