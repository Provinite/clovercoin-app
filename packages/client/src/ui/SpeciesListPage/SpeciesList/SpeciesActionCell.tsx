import { css } from "aphrodite";
import * as React from "react";
import { useCallback, FC, MouseEvent, HTMLAttributes } from "react";
import { FaPencilAlt, FaRegMinusSquare } from "react-icons/fa";
import { useHover } from "../../../hooks/useHover";
import { ListViewSpecies } from "../../../models/Species";
import { SpeciesEventHandler } from "./SpeciesEventHandler";
import { stylesheet } from "./SpeciesList.stylesheet";

export interface SpeciesActionCellProps extends HTMLAttributes<HTMLDivElement> {
  species: ListViewSpecies;
  onEditClick: SpeciesEventHandler;
  onRemoveClick: SpeciesEventHandler;
  styles?: (object | false | undefined | null)[];
}

export const SpeciesActionCell: FC<SpeciesActionCellProps> = ({
  species,
  onEditClick,
  onRemoveClick,
  styles = [],
  ...rest
}) => {
  const [isHovered, hoverProps] = useHover();

  const invokeOnEditClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      return onEditClick(species);
    },
    [species, onEditClick]
  );

  const invokeOnRemoveClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      return onRemoveClick(species);
    },
    [species, onRemoveClick]
  );

  return (
    <div className={css(stylesheet.actionColumn, ...styles)} {...rest}>
      <FaPencilAlt
        size="24px"
        className={css(stylesheet.actionEdit)}
        onClick={invokeOnEditClick}
      />
      <FaRegMinusSquare
        {...hoverProps}
        size="24px"
        className={css(
          stylesheet.actionRemove,
          isHovered && stylesheet.actionRemoveHover
        )}
        onClick={invokeOnRemoveClick}
      />
    </div>
  );
};
