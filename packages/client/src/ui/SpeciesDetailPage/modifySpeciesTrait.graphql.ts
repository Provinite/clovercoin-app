import gql from "graphql-tag";

export const modifySpeciesTraitMutation = gql`
  mutation modifySpeciesTrait($input: TraitModifyInput!) {
    modifyTrait(input: $input) {
      ... on Trait {
        id
        name
        valueType
        enumValues {
          id
          name
        }
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
