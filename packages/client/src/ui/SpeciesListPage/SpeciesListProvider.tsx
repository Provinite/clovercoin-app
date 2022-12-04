import { FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AppRoutes } from "../AppRoutes";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { useRouteCommunity } from "../../useRouteCommunity";
import { SpeciesListPage, SpeciesListPageProps } from "./SpeciesListPage";
import { LoaderData, RouteType } from "../../routes";

export interface SpeciesListProviderProps
  extends Omit<
    SpeciesListPageProps,
    "data" | "onSpeciesClick" | "headerBarProps"
  > {}

export const SpeciesListProvider: FC<SpeciesListProviderProps> = (args) => {
  const navigate = useNavigate();
  const speciesList = useLoaderData() as LoaderData<
    RouteType<"root.community.species-list">
  >;
  const community = useRouteCommunity();
  return (
    <SpeciesListPage
      {...args}
      data={speciesList}
      headerBarProps={useHeaderBarProps()}
      onSpeciesClick={(s) =>
        navigate(AppRoutes.speciesDetail(community.id, s.id))
      }
    />
  );
};
