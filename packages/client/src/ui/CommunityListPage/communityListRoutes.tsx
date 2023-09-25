import { isCommunity, isCommunityList } from "@clovercoin/api-client";
import { LoaderFunctionArgs } from "react-router-dom";
import { graphqlService } from "../../graphql/client";
import { typedRouteConfig } from "../../routes";
import { makeAction } from "../../utils/loaderUtils";
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

export const communityListAction = makeAction(
  {
    form: {
      name: true,
    },
  },
  async ({ method, form: { name } }) => {
    if (method === "POST") {
      const {
        data: { createCommunity },
      } = await graphqlService.createCommunity({
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
      return createCommunity;
    }
  }
);

export const communityListRoutes = typedRouteConfig({
  id: "root.community-list",
  path: "communities",
  loader: communityListLoader,
  action: communityListAction,
  element: <CommunityListPage />,
});
