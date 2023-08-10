import gql from "graphql-tag";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";

export const loginMutation = gql`
  mutation login($input: LoginArgs!) {
    login(input: $input) {
      __typename
      ... on LoginSuccessResponse {
        identity {
          displayName
          id
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
