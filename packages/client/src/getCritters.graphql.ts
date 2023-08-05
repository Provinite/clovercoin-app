import gql from "graphql-tag";

export const getCrittersQuery = gql`
  query getCritters {
    critters {
      id
      name
      traitValues {
        dataType
        traitId
        value
      }
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
