import * as React from "react";
import { FC, useCallback, ChangeEventHandler, useState } from "react";
import { useGetSpeciesListViewQuery } from "../../generated/graphql";
import { SpeciesEventHandler } from "./SpeciesList/SpeciesEventHandler";
import { SpeciesListPage } from "./SpeciesListPage";

export interface SpeciesListProviderProps {}
/**
 * Component that renders a species list with data from the graphql API.
 */
export const SpeciesListProvider: FC<SpeciesListProviderProps> = () => {
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

  const onRowClick: SpeciesEventHandler = useCallback((e) => {
    console.log(e);
  }, []);

  const { data, loading } = useGetSpeciesListViewQuery({
    variables: {
      name: searchText,
    },
  });

  if (!loading && !data) {
    throw new Error("Error fetching data for species list view");
  }

  return (
    <SpeciesListPage
      headerBarProps={{
        userIconUrl: "",
        userName: "",
      }}
      speciesListProps={{
        onRowClick,
        onEditClick,
        onRemoveClick,
        onSearchTextChange,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        species: loading ? [] : data!.species,
        searchText,
      }}
    />
  );
};
