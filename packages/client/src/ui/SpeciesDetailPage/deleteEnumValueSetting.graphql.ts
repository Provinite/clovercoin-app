import gql from "graphql-tag";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";

export const deleteEnumValueSettingMutation = gql`
  mutation deleteEnumValueSetting($id: ID!) {
    deleteEnumValueSetting(input: { id: $id }) {
      __typename
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on DeleteResponse {
        ok
      }
    }
  }
  ${InvalidArgumentErrorFragmentGraphql}
`;
