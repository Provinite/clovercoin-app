import gql from "graphql-tag";

export const createCommunityMutation = gql`
  mutation createCommunity($input: CommunityCreateInput!) {
    createCommunity(input: $input) {
      __typename
      ... on Community {
        name
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
