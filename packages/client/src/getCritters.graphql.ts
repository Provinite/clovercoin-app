import gql from "graphql-tag";

export const getCrittersQuery = gql`
  query getCritters {
    critters {
      id
      name
      traits {
        ... on CritterTrait {
          trait {
            id
            valueType
          }
          displayValue
        }
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
