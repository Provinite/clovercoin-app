import { useRouteLoaderData } from "react-router-dom";
import { GetCommunityQuery } from "../../generated/graphql";

export const useRouteCommunity = () =>
  useRouteLoaderData("community") as GetCommunityQuery["communities"][number];
