import {
  DuplicateErrorFragmentFragmentDoc,
  InvalidArgumentErrorFragmentFragmentDoc,
} from "@clovercoin/api-client";
import gql from "graphql-tag";

export const CreateInviteCodeMutation = gql`
  mutation createInviteCode($input: InviteCodeCreateInput!) {
    createInviteCode(input: $input) {
      __typename
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InviteCode {
        id
        creator {
          displayName
        }
        claimCount
        maxClaims
      }
    }
  }
  ${DuplicateErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
