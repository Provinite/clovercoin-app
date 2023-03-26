import gql from "graphql-tag";

import BaseErrorFragmentGraphql from "../../utils/error-fragments/BaseErrorFragment.graphql";
import DuplicateErrorFragmentGraphql from "../../utils/error-fragments/DuplicateErrorFragment.graphql";
import InvalidArgumentErrorFragmentGraphql from "../../utils/error-fragments/InvalidArgumentErrorFragment.graphql";

export const createEnumValueSettingMutation = gql`
  mutation createEnumValueSetting($input: EnumValueSettingCreateInput!) {
    createEnumValueSetting(input: $input) {
      __typename
      ... on EnumValueSetting {
        id
        enumValueId
        traitListId
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${BaseErrorFragmentGraphql}
  ${DuplicateErrorFragmentGraphql}
  ${InvalidArgumentErrorFragmentGraphql}
`;
