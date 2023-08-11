import gql from "graphql-tag";

export const getIdentityListQuery = gql`
  query getIdentityList {
    identities {
      displayName
      email
      id
    }
  }
`;
