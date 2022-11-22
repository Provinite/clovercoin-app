import * as React from "react";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { SpeciesDetailPage, SpeciesDetailPageProps } from "./SpeciesDetailPage";
import { useRouteSpecies } from "./useRouteSpecies";

export interface SpeciesDetailPageProviderProps
  extends Omit<SpeciesDetailPageProps, "headerBarProps" | "species"> {}

export const SpeciesDetailPageProvider: FC<SpeciesDetailPageProviderProps> = (
  props
) => {
  const species = useRouteSpecies();

  return (
    <SpeciesDetailPage
      {...props}
      species={species}
      headerBarProps={useHeaderBarProps()}
    >
      <Outlet />
    </SpeciesDetailPage>
  );
};
