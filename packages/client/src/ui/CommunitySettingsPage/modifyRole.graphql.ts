import {
  BaseErrorFragmentFragmentDoc,
  DuplicateErrorFragmentFragmentDoc,
  InvalidArgumentErrorFragmentFragmentDoc,
  NotAuthenticatedErrorFragmentFragmentDoc,
  RolePermissionsFragmentFragmentDoc,
} from "@clovercoin/api-client";
import gql from "graphql-tag";

export const modifyRoleMutation = gql`
  mutation modifyRole($input: RoleModifyInput!) {
    modifyRole(input: $input) {
      __typename
      ... on Role {
        id
        name
        ...RolePermissionsFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${RolePermissionsFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${DuplicateErrorFragmentFragmentDoc}
  ${NotAuthenticatedErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
`;
