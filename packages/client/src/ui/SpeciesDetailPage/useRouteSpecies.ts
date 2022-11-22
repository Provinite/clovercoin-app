import { useRouteLoaderData } from "react-router-dom";
import { GetSpeciesDetailQuery } from "../../generated/graphql";

export const useRouteSpecies = () =>
  useRouteLoaderData(
    "species.detail"
  ) as GetSpeciesDetailQuery["species"][number];
