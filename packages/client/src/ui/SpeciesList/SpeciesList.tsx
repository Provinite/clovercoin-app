import { css, StyleSheet } from "aphrodite";
import * as React from "react";
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import { FaPencilAlt, FaRegMinusSquare } from "react-icons/fa";
import { GetSpeciesListViewQuery } from "../../generated/graphql";
import { ListViewSpecies } from "../../models/Species";
import { ColumnDefinition, DataTable } from "../lib/DataTable/DataTable";

export type SpeciesEventHandler = (species: ListViewSpecies) => void;
export interface SpeciesListProps {
  species: GetSpeciesListViewQuery["species"];
  onRemoveClick: SpeciesEventHandler;
  onEditClick: SpeciesEventHandler;
  onSearchTextChange: ChangeEventHandler<HTMLInputElement>;
  searchText: string;
}

const stylesheet = StyleSheet.create({
  actionColumn: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  actionEdit: {
    cursor: "pointer",
    display: "block",
    minWidth: 0,
  },
  actionRemove: {
    cursor: "pointer",
    display: "block",
    marginLeft: "16px",
    color: "red",
  },
});

const SpeciesActionRow: FC<{
  species: ListViewSpecies;
  onEditClick: SpeciesEventHandler;
  onRemoveClick: SpeciesEventHandler;
}> = ({ species, onEditClick, onRemoveClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseOver = useCallback(() => {
    setIsHovered(true);
  }, [setIsHovered]);

  const onMouseOut = useCallback<MouseEventHandler>(() => {
    setIsHovered(false);
  }, [setIsHovered]);

  const invokeOnEditClick = useCallback(
    () => onEditClick(species),
    [species, onEditClick]
  );

  const invokeOnRemoveClick = useCallback(
    () => onRemoveClick(species),
    [species, onRemoveClick]
  );

  return (
    <div
      className={css(stylesheet.actionColumn)}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOut}
    >
      <FaPencilAlt
        size="24px"
        className={css(stylesheet.actionEdit)}
        onClick={invokeOnEditClick}
      />
      {isHovered && (
        <FaRegMinusSquare
          size="24px"
          className={css(stylesheet.actionRemove)}
          onClick={invokeOnRemoveClick}
        />
      )}
    </div>
  );
};

export const SpeciesList: FC<SpeciesListProps> = ({
  species,
  onEditClick,
  onRemoveClick,
  onSearchTextChange,
  searchText,
}) => {
  const columnDefinitions = useMemo<ColumnDefinition<ListViewSpecies>[]>(() => {
    return [
      {
        name: "Name",
        selector: (s) => s.name,
        width: 9,
      },
      {
        name: "Actions",
        selector: (s) => (
          <SpeciesActionRow
            species={s}
            onEditClick={onEditClick}
            onRemoveClick={onRemoveClick}
          />
        ),
        width: 3,
      },
    ];
  }, []);

  return (
    <div>
      <input
        type="text"
        onChange={onSearchTextChange}
        value={searchText || ""}
      />
      <DataTable data={species} columns={columnDefinitions} />
    </div>
  );
};
