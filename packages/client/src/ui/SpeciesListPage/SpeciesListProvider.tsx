import * as React from "react";
import { FC, useCallback, ChangeEventHandler, useState } from "react";
import { useGetSpeciesListViewQuery } from "../../generated/graphql";
import { SpeciesEventHandler } from "../SpeciesList/SpeciesList";
import { SpeciesListPage } from "./SpeciesListPage";

export interface SpeciesListProviderProps {}

export const SpeciesListProvider: FC<SpeciesListProviderProps> = (args) => {
  const [searchText, setSearchText] = useState("");

  const onEditClick: SpeciesEventHandler = useCallback((e) => {
    console.log(e);
  }, []);
  const onRemoveClick: SpeciesEventHandler = useCallback((e) => {
    console.log(e);
  }, []);
  const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearchText(e.target.value);
    },
    [setSearchText]
  );

  const result = useGetSpeciesListViewQuery();

  return (
    <SpeciesListPage
      headerBarProps={{
        userIconUrl: "",
        userName: "",
      }}
      speciesListProps={{
        onEditClick,
        onRemoveClick,
        onSearchTextChange,
        species: result.loading ? [] : result.data!.species,
        searchText,
      }}
    />
  );
};
