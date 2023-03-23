import gql from "graphql-tag";

export default gql`
  mutation modifyTraitListEntry($input: TraitListEntryModifyInput!) {
    modifyTraitListEntry(input: $input) {
      __typename
      ... on TraitListEntry {
        id
        defaultDisplayValue
        order
        required
        trait {
          id
          name
          valueType
          enumValues {
            id
            name
          }
        }
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
