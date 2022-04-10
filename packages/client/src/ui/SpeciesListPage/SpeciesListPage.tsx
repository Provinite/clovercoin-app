import { css, StyleSheet } from "aphrodite";
import * as React from "react";
import { FC } from "react";
import { HeaderBar, HeaderBarProps } from "../HeaderBar/HeaderBar";
import { SpeciesList, SpeciesListProps } from "../SpeciesList/SpeciesList";

export interface SpeciesListPageProps {
  speciesListProps: SpeciesListProps;
  headerBarProps: Omit<HeaderBarProps, "title">;
}

export const SpeciesListPage: FC<SpeciesListPageProps> = ({
  speciesListProps,
  headerBarProps,
}) => {
  const { container } = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
    },
  });
  return (
    <div className={css(container)}>
      <HeaderBar {...headerBarProps} title="Species"></HeaderBar>
      <SpeciesList {...speciesListProps}></SpeciesList>
    </div>
  );
};
