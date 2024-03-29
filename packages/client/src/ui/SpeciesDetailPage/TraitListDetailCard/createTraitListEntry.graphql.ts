import gql from "graphql-tag";

export default gql`
  mutation createTraitListEntry($input: TraitListEntryCreateInput!) {
    createTraitListEntry(input: $input) {
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
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
`;
