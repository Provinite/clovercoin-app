import gql from "graphql-tag";
import NotAuthorizedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthorizedErrorFragment.graphql";

export const createSpeciesUploadUrlMutation = gql`
  mutation createSpeciesImageUploadUrl($input: SpeciesImageUrlCreateInput!) {
    createSpeciesImageUploadUrl(input: $input) {
      __typename
      ... on UrlResponse {
        url
      }
      ... on NotAuthorizedError {
        ...NotAuthorizedErrorFragment
      }
    }
  }
  ${NotAuthorizedErrorFragmentGraphql}
`;
