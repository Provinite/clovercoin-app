import gql from "graphql-tag";

export default gql`
  fragment BaseErrorFragment on BaseError {
    message
  }
`;
