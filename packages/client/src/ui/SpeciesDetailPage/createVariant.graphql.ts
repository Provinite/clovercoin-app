import gql from "graphql-tag";

export const createVariantMutation = gql`
  mutation createVariant($input: TraitListCreateInput!) {
    createTraitList(input: $input) {
      ... on TraitList {
        id
        name
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
