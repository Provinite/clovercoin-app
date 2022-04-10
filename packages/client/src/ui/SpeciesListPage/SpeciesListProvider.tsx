import * as React from "react";
import { FC } from "react";
import { SpeciesListPage, SpeciesListPageProps } from "./SpeciesListPage";

export interface SpeciesListProviderProps extends SpeciesListPageProps {}

export const SpeciesListProvider: FC<SpeciesListProviderProps> = (args) => {
  return <SpeciesListPage {...args} />;
};
