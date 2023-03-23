import { isCommunity, isCommunityList } from "@clovercoin/api-client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { graphqlService } from "../../client";
import { typedRouteConfig } from "../../routes";
import { CommunityListPage } from "./CommunityListPage";

export const communityListLoader = async (_args: LoaderFunctionArgs) => {
  const {
    data: { communities },
  } = await graphqlService.getCommunityListView({
    variables: {
      filters: {},
    },
  });

  if (isCommunityList(communities)) {
    return communities.list;
  }

  throw new Error("404");
};

export const communityListAction = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "POST") {
    const data = await request.formData();
    const name = data.get("name");
    if (!name || typeof name !== "string") {
      throw new Error("400");
    }
    const result = await graphqlService.createCommunity({
      variables: {
        input: {
          name,
        },
      },

      update: (cache, { data }) => {
        if (data && isCommunity(data.createCommunity)) {
          cache.modify({
            fields: {
              communities: (_data, { DELETE }) => DELETE,
            },
          });
        }
      },
    });
    return result.data.createCommunity;
  }
};

export const communityListRoutes = typedRouteConfig({
  id: "root.community-list",
  path: "communities",
  loader: communityListLoader,
  action: communityListAction,
  element: <CommunityListPage />,
});
