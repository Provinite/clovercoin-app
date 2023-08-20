import gql from "graphql-tag";

export default gql`
  fragment NotAuthorizedErrorFragment on NotAuthorizedError {
    message
  }
`;
