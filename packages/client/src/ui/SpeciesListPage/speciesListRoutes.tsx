import { isSpeciesList, isBaseError } from "@clovercoin/api-client";
import { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";
import { graphqlService } from "../../client";
import { typedRouteConfig } from "../../routes";
import { slugToUuid } from "../../utils/uuidUtils";
import { SpeciesListProvider } from "./SpeciesListProvider";

export const speciesListRoutes = typedRouteConfig({
  id: "root.community.species-list",
  path: "species",
  element: <SpeciesListProvider />,
  loader: async ({ params: { communityId } }: LoaderFunctionArgs) => {
    if (!communityId) {
      throw new Error("Missing community id in route");
    }
    communityId = slugToUuid(communityId);
    const result = await graphqlService.getSpeciesListView({
      variables: {
        communityId,
      },
    });

    if (!isSpeciesList(result.data.species)) {
      throw new Error("404");
    }

    return result.data.species;
  },
  action: async ({
    params: { communityId: communitySlug },
    request,
  }: ActionFunctionArgs) => {
    if (request.method === "POST") {
      const formData = await request.formData();

      if (!communitySlug) {
        throw new Error("Missing community id in route");
      }
      const communityId = slugToUuid(communitySlug);
      const result = await graphqlService.createSpecies({
        variables: {
          input: {
            communityId: communityId,
            name: formData.get("name") as string,
          },
        },
        update(cache, { data }) {
          if (isBaseError(data)) {
            return;
          }
          // bop any cached species list queries for this community (if we succeeded)
          cache.modify({
            fields: {
              species: (_data, { DELETE, storeFieldName }) => {
                if (storeFieldName.includes(communityId)) {
                  return DELETE;
                }
              },
            },
          });
        },
      });

      if (isBaseError(result.data.createSpecies)) {
        return result.data.createSpecies;
      }
    }
  },
});
