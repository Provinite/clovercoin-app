import * as React from "react";
import { FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { GetSpeciesListViewQuery } from "../../generated/graphql";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { SpeciesListPage, SpeciesListPageProps } from "./SpeciesListPage";

export interface SpeciesListProviderProps
  extends Omit<
    SpeciesListPageProps,
    "data" | "onSpeciesClick" | "headerBarProps"
  > {}

export const SpeciesListProvider: FC<SpeciesListProviderProps> = (args) => {
  const navigate = useNavigate();
  const speciesList = useLoaderData() as GetSpeciesListViewQuery;
  return (
    <SpeciesListPage
      {...args}
      data={speciesList}
      headerBarProps={useHeaderBarProps()}
      onSpeciesClick={(s) => navigate(`${s.id}/`)}
    />
  );
};
