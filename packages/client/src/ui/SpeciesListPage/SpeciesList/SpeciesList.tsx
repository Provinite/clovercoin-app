import { css } from "aphrodite";
import * as React from "react";
import { FC, HTMLAttributes, useMemo } from "react";
import { ListViewSpecies } from "../../../models/Species";
import { StyleDeclaration } from "../../aphrodite/StyleDeclaration";
import { SpeciesEventHandler } from "./SpeciesEventHandler";
import { stylesheet as ss } from "./SpeciesList.stylesheet";
import { stylish } from "../../lib/styles/stylish";
export interface SpeciesListProps extends HTMLAttributes<HTMLDivElement> {
  species: ListViewSpecies[];
  selectedSpecies?: ListViewSpecies;
  onRowClick: SpeciesEventHandler;
  cellStyles?: {
    name?: StyleDeclaration[];
    action?: StyleDeclaration[];
  };
  styles?: (object | undefined)[];
}
/**
 * Presentational component for rendering an interactive list of species.
 */
export const SpeciesList: FC<SpeciesListProps> = ({
  species,
  onRowClick,
  selectedSpecies,
  styles = [],
  cellStyles = {},
  ...rest
}) => {
  const activeIndex = useMemo(() => {
    if (!selectedSpecies) {
      return -2;
    }
    const idx = species.findIndex((s) => s.id === selectedSpecies?.id);
    return idx === -1 ? -2 : idx;
  }, [species, selectedSpecies]);

  return (
    <div {...rest} className={css(ss.gridContainer, ...styles)}>
      {
        // List Header
      }
      <div
        className={css(
          ss.tableCell,
          ss.headerCell,
          ...stylish(ss, {
            flareBeforeHoverRow: activeIndex === 0,
          })
        )}
      >
        Name
      </div>
      {
        // List Contents
      }
      {species.map((species, i) => (
        <div
          onClick={onRowClick.bind(null, species)}
          className={css(
            ss.tableCell,
            ss.hoverableCell,
            ss.clickable,
            ...stylish(ss, {
              cellInSelectedRow: activeIndex === i,
              flareBeforeHoverRow: activeIndex - 1 === i,
              flareAfterHoverRow: activeIndex + 1 === i,
            }),
            ...(cellStyles.name || [])
          )}
        >
          {species.name}
        </div>
      ))}
      {
        // This dummy row is used to provide the above-and-below symmetric
        // flaring on rows adjacent to the selected one.
        // It gets kinda weird if the list is full-height already
        // but not too much.
      }
      <div
        className={css(
          ss.tableCell,
          ss.dummyCell,
          ...stylish(ss, {
            flareAfterHoverRow: activeIndex === species.length - 1,
          })
        )}
      >
        {" "}
      </div>
    </div>
  );
};
