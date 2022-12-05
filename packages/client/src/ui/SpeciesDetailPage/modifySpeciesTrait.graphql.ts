import gql from "graphql-tag";

export const modifySpeciesTraitMutation = gql`
  mutation modifySpeciesTrait($input: TraitModifyInput!) {
    modifyTrait(input: $input) {
      id
      name
      valueType
      enumValues {
        id
        name
      }
    }
  }
`;
