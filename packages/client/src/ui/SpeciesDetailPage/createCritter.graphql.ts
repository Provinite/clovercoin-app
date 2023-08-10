import gql from "graphql-tag";

export const createCritterMutation = gql`
  mutation createCritter($input: CritterCreateInput!) {
    createCritter(input: $input) {
      ... on Critter {
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
