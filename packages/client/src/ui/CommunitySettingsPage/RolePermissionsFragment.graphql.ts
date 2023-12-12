import gql from "graphql-tag";

export const RolePermissionsFragmentGraphql = gql`
  fragment RolePermissionsFragment on Role {
    canCreateCritter
    canCreateInviteCode
    canCreateRole
    canCreateSpecies
    canEditCritter
    canEditRole
    canEditSpecies
    canListInviteCodes
  }
`;
