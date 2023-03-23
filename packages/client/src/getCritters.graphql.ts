import gql from "graphql-tag";

export const getCrittersQuery = gql`
  query getCritters {
    critters {
      id
      name
      traitValues
      species {
        id
        name
        traitLists {
          id
          name
        }
      }
    }
  }
`;
