import { gql } from "graphql-request";
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
    }
  }
  ${InvalidArgumentErrorFragmentGraphql}
`;
