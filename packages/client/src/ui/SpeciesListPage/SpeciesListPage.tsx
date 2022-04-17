import { css, StyleSheet } from "aphrodite";
import * as React from "react";
import { FC, HTMLProps, TransitionEventHandler, useCallback } from "react";
import { HeaderBar, HeaderBarProps } from "../HeaderBar/HeaderBar";
import {
  TransitionDuration,
  TransitionTimingFunction,
} from "../lib/styles/animation";
import { Color } from "../lib/styles/colors";
import {
  SpeciesDetail,
  SpeciesDetailProps,
} from "./SpeciesDetail/SpeciesDetail";
import { SpeciesList, SpeciesListProps } from "./SpeciesList/SpeciesList";
import { listBorderStyle } from "./SpeciesList/SpeciesList.stylesheet";

export interface SpeciesListPageProps {
  speciesListProps: SpeciesListProps;
  speciesDetailProps: SpeciesDetailProps;
  headerBarProps: Omit<HeaderBarProps, "title">;
  searchInputProps: HTMLProps<HTMLInputElement>;
  listContainerProps?: HTMLProps<HTMLDivElement>;
  onDetailViewTransitionEnd: () => void;
  detailViewTransition: boolean;
  showDetailView: boolean;
}

const transition = `all ${TransitionDuration.fullscreen} ${TransitionTimingFunction.EaseInBounceOut}`;
const transitionOut = `all ${TransitionDuration.fullscreen} ${TransitionTimingFunction.QuickInEaseOut}`;

export const SpeciesListPage: FC<SpeciesListPageProps> = ({
  searchInputProps,
  headerBarProps,
  speciesListProps,
  speciesDetailProps,
  detailViewTransition,
  listContainerProps,
  onDetailViewTransitionEnd,
  showDetailView,
}) => {
  const {
    container,
    table,
    slimTable,
    fatTable,
    detail,
    searchInput,
    hidden,
    searchInputWrapper,
    contentContainer,
  } = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minHeight: "100%",
      overflowX: "hidden",
      paddingBottom: "16px",
      backgroundColor: Color.List.activeRow,
    },
    contentContainer: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
      flexBasis: "100%",
      backgroundColor: Color.List.background,
    },
    table: {
      flexGrow: 1,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
    },
    fatTable: {
      flexBasis: "100%",
      minWidth: "100%",
      transition: transitionOut,
    },
    slimTable: {
      minWidth: "300px",
      flexBasis: "300px",
      transition,
    },
    detail: {
      minWidth: "80%",
      width: "80%",
    },
    searchInput: {
      margin: "16px",
      borderRadius: "12px",
      padding: "4px 8px",
      border: `2px solid ${Color.Input.border}`,
      fontWeight: 300,
      fontSize: "16px",
      outline: 0,
      display: "block",

      ":focus": {
        border: `2px solid ${Color.Input.Focus.border}`,
      },
      ":placeholder-shown": {
        fontStyle: "italic",
      },
    },
    searchInputWrapper: {
      borderRight: listBorderStyle,
    },
    hidden: {
      visibility: "hidden",
    },
  });

  const handleDetailViewTransitionEnd = useCallback<TransitionEventHandler>(
    (e) => {
      if (e.propertyName === "flex-basis") {
        onDetailViewTransitionEnd();
      }
    },
    [onDetailViewTransitionEnd]
  );

  return (
    <div className={css(container)}>
      <HeaderBar {...headerBarProps} title="Species"></HeaderBar>
      <div className={css(contentContainer)}>
        <div
          {...listContainerProps}
          className={css(table, detailViewTransition ? slimTable : fatTable)}
          onTransitionEnd={handleDetailViewTransitionEnd}
        >
          <div className={css(searchInputWrapper)}>
            <input
              type="text"
              placeholder="Search 🔎"
              {...searchInputProps}
              className={css(searchInput)}
            />
          </div>
          <SpeciesList {...speciesListProps} />
        </div>
        {showDetailView && (
          <SpeciesDetail
            species={speciesDetailProps.species}
            styles={[detail]}
          />
        )}
      </div>
    </div>
  );
};
