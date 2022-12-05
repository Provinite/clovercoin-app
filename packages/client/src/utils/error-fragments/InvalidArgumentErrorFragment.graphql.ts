import gql from "graphql-tag";

export default gql`
  fragment InvalidArgumentErrorFragment on InvalidArgumentError {
    message
    validationErrors {
      constraints {
        key
        description
      }
      field
    }
  }
`;
