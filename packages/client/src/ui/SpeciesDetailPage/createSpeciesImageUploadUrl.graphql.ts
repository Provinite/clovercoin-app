import gql from "graphql-tag";

export const createSpeciesUploadUrlMutation = gql`
  mutation createSpeciesImageUploadUrl($input: SpeciesImageUrlCreateInput!) {
    createSpeciesImageUploadUrl(input: $input) {
      url
      __typename
    }
  }
`;
