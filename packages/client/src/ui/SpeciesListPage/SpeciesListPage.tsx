import { css, StyleSheet } from "aphrodite";
import * as React from "react";
import { FC, HTMLProps, TransitionEventHandler, useCallback } from "react";
import { HeaderBar, HeaderBarProps } from "../HeaderBar/HeaderBar";
import { Page } from "../lib/Page/Page";
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
  /**
   * Props for the species list
   */
  speciesListProps: SpeciesListProps;
  /**
   * Props for the species detail
   */
  speciesDetailProps: SpeciesDetailProps;
  /**
   * Props for the header bar
   */
  headerBarProps: Omit<HeaderBarProps, "title">;
  /**
   * Props for the search input element
   */
  searchInputProps: HTMLProps<HTMLInputElement>;
  /**
   * Props for the list container element that wraps the list and
   * search
   */
  listContainerProps?: HTMLProps<HTMLDivElement>;
  /**
   * Fired when a transition finishes for the detail view.
   */
  onDetailViewTransitionEnd: () => void;
  /**
   * Toggling this prop will begin a transition for the detail view table.
   * A value of true indicates an ongoing or completed transition in,
   * while a value of false indicates an ongoing or completed transition out.
   */
  detailViewTransition: boolean;
  /**
   * Controls whether the detail view is rendered at all.
   */
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
    table,
    slimTable,
    fatTable,
    detail,
    searchInput,
    searchInputWrapper,
    contentContainer,
  } = StyleSheet.create({
    /** Entire content container for page */
    contentContainer: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
      flexBasis: "100%",
      backgroundColor: Color.List.background,
    },
    /** List */
    table: {
      flexGrow: 1,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
    },
    /** List when detail not shown */
    fatTable: {
      flexBasis: "100%",
      minWidth: "100%",
      transition: transitionOut,
    },
    /** List when detail shown */
    slimTable: {
      minWidth: "300px",
      flexBasis: "300px",
      transition,
    },
    /** Detail container */
    detail: {
      minWidth: "calc(100% - 300px)",
      width: "calc(100% - 300px)",
    },
    /** Search input element */
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
    <Page>
      <HeaderBar {...headerBarProps} title="Species" />
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
    </Page>
  );
};
