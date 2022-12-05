import gql from "graphql-tag";

export default gql`
  fragment DuplicateErrorFragment on DuplicateError {
    __typename
    duplicateKeys
    message
  }
`;
