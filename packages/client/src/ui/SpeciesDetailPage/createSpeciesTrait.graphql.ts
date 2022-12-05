import gql from "graphql-tag";

export const createSpeciesTraitMutation = gql`
  mutation createSpeciesTrait($input: TraitCreateInput!) {
    createTrait(input: $input) {
      id
    }
  }
`;
