import gql from "graphql-tag";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";

export const requestPasswordResetMutation = gql`
  mutation requestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      __typename
      ... on RequestPasswordResetReceivedResponse {
        message
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentGraphql}
`;
