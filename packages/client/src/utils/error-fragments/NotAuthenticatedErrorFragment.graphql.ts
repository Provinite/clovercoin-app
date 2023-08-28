import gql from "graphql-tag";

export default gql`
  fragment NotAuthenticatedErrorFragment on NotAuthenticatedError {
    message
  }
`;
