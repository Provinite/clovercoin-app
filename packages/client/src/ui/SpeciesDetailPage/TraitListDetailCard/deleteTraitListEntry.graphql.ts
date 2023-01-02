import gql from "graphql-tag";

export const deleteTraitListEntry = gql`
  mutation deleteTraitListEntry($id: ID!) {
    deleteTraitListEntry(id: $id)
  }
`;
