import gql from "graphql-tag";

export const deleteTraitMutation = gql`
  mutation deleteTrait($id: ID!) {
    deleteTrait(id: $id)
  }
`;
