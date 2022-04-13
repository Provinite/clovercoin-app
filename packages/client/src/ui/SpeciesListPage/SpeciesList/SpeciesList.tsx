import { css } from "aphrodite";
import * as React from "react";
import { ChangeEventHandler, FC, useCallback } from "react";
import { GetSpeciesListViewQuery } from "../../../generated/graphql";
import { GridStateRow } from "./GridStateRow";
import { SpeciesActionCell } from "./SpeciesActionCell";
import { SpeciesEventHandler } from "./SpeciesEventHandler";
import { stylesheet } from "./SpeciesList.stylesheet";

export interface SpeciesListProps {
  species: GetSpeciesListViewQuery["species"];
  onRowClick: SpeciesEventHandler;
  onRemoveClick: SpeciesEventHandler;
  onEditClick: SpeciesEventHandler;
  onSearchTextChange: ChangeEventHandler<HTMLInputElement>;
  searchText: string;
}
/**
 * Presentational component for rendering an interactive list of species.
 */
export const SpeciesList: FC<SpeciesListProps> = ({
  species,
  onEditClick,
  onRemoveClick,
  onSearchTextChange,
  onRowClick,
  searchText,
}) => {
  return (
    <div>
      <input type="text" onChange={onSearchTextChange} value={searchText} />
      <div className={css(stylesheet.gridContainer)}>
        <div className={css(stylesheet.headerRow)}>
          <div>Name</div>
          <div>Actions</div>
        </div>
        {species.map((species) => (
          <GridStateRow onClick={useCallback(() => onRowClick(species), [])}>
            {({ isHovering }) => {
              return (
                <>
                  <div
                    className={css(
                      stylesheet.tableCell,
                      isHovering && stylesheet.cellInHoverRow
                    )}
                  >
                    {species.name}
                  </div>
                  <SpeciesActionCell
                    styles={[
                      stylesheet.tableCell,
                      isHovering && stylesheet.cellInHoverRow,
                    ]}
                    species={species}
                    onEditClick={onEditClick}
                    onRemoveClick={onRemoveClick}
                  />
                </>
              );
            }}
          </GridStateRow>
        ))}
      </div>
    </div>
  );
};
