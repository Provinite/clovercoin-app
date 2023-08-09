import gql from "graphql-tag";

export const createCritterMutation = gql`
  mutation modifyCritter($input: CritterModifyInput!) {
    modifyCritter(input: $input) {
      __typename
      ... on Critter {
        id
        name
        traitValues {
          traitId
          value
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
