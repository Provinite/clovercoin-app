import { gql } from "graphql-request";
import DuplicateErrorFragmentGraphql from "../../utils/error-fragments/DuplicateErrorFragment.graphql";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";

export const registerMutation = gql`
  mutation register($input: RegisterArgs!) {
    register(input: $input) {
      __typename
      ... on LoginSuccessResponse {
        identity {
          id
          displayName
        }
        token
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentGraphql}
  ${DuplicateErrorFragmentGraphql}
`;
