import { isCommunityList } from "@clovercoin/api-client";
import { LoaderFunctionArgs } from "react-router-dom";
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

export const CommunityListRoutes = typedRouteConfig({
  id: "root.community-list",
  path: "communities",
  loader: communityListLoader,
  element: <CommunityListPage />,
});
