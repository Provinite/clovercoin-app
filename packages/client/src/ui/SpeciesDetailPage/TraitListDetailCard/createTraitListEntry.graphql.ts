import gql from "graphql-tag";

export default gql`
  mutation createTraitListEntry($input: TraitListEntryCreateInput!) {
    createTraitListEntry(input: $input) {
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
  }
`;
