import gql from "graphql-tag";

export const createSpeciesTraitMutation = gql`
  mutation createSpeciesTrait($input: TraitCreateInput!) {
    createTrait(input: $input) {
      ... on Trait {
        id
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
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
