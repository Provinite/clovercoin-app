import gql from "graphql-tag";

export default gql`
  mutation createSpecies($input: SpeciesCreateInput!) {
    __typename
    createSpecies(input: $input) {
      ... on Species {
        id
        name
        iconUrl
        variants {
          id
          name
          traitListEntries {
            id
            trait {
              name
              valueType
            }
            order
            required
            defaultDisplayValue
          }
        }
      }
      ... on DuplicateError {
        duplicateKeys
        message
      }
      ... on InvalidArgumentError {
        message
        validationErrors {
          constraints {
            description
            key
          }
        }
      }
      ... on BaseError {
        message
      }
    }
  }
`;
