import * as React from "react";
import { FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { GetSpeciesListViewQuery } from "@clovercoin/api-client";
import { AppRoutes } from "../AppRoutes";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { useRouteCommunity } from "../../useRouteCommunity";
import { SpeciesListPage, SpeciesListPageProps } from "./SpeciesListPage";

export interface SpeciesListProviderProps
  extends Omit<
    SpeciesListPageProps,
    "data" | "onSpeciesClick" | "headerBarProps"
  > {}

export const SpeciesListProvider: FC<SpeciesListProviderProps> = (args) => {
  const navigate = useNavigate();
  const speciesList = useLoaderData() as GetSpeciesListViewQuery;
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
