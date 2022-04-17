import { css } from "aphrodite";
import * as React from "react";
import { FC, HTMLAttributes, useMemo } from "react";
import { ListViewSpecies } from "../../../models/Species";
import { StyleDeclaration } from "../../aphrodite/StyleDeclaration";
import { GridStateRow } from "./GridStateRow";
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
      <div className={css(ss.headerRow)}>
        <div
          className={css(
            ss.headerCell,
            ...stylish(ss, {
              flareBeforeHoverRow: activeIndex === 0,
            })
          )}
        >
          Name
        </div>
      </div>
      {species.map((species, i) => (
        <GridStateRow onClick={() => onRowClick(species)} key={species.id}>
          {({ isHovering }) => {
            return (
              <>
                <div
                  className={css(
                    ...stylish(ss, {
                      tableCell: true,
                      cellInHoverRow: isHovering,
                      cellInSelectedRow: activeIndex === i,
                      flareBeforeHoverRow: activeIndex - 1 === i,
                      flareAfterHoverRow: activeIndex + 1 === i,
                    }),
                    ...(cellStyles.name || [])
                  )}
                >
                  {species.name}
                </div>
              </>
            );
          }}
        </GridStateRow>
      ))}
      <div
        className={css(
          ...stylish(ss, {
            tableCell: true,
            dummyCell: true,
            flareAfterHoverRow: activeIndex === species.length - 1,
          })
        )}
      >
        {" "}
      </div>
    </div>
  );
};
