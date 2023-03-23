import gql from "graphql-tag";

export const deleteTraitListEntry = gql`
  mutation deleteTraitListEntry($id: ID!) {
    deleteTraitListEntry(id: $id) {
      __typename
      ... on DeleteResponse {
        ok
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
`;
