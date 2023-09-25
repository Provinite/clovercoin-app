import gql from "graphql-tag";
import NotAuthenticatedErrorFragmentGraphql from "../../utils/error-fragments/NotAuthenticatedErrorFragment.graphql";

export const createSpeciesUploadUrlMutation = gql`
  mutation createSpeciesImageUploadUrl($input: SpeciesImageUrlCreateInput!) {
    createSpeciesImageUploadUrl(input: $input) {
      __typename
      ... on UrlResponse {
        url
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${NotAuthenticatedErrorFragmentGraphql}
`;
