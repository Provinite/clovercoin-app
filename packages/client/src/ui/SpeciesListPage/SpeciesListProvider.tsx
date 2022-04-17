import * as React from "react";
import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { useGetSpeciesListViewQuery } from "../../generated/graphql";
import { ListViewSpecies } from "../../models/Species";
import { SpeciesEventHandler } from "./SpeciesList/SpeciesEventHandler";
import { SpeciesListPage } from "./SpeciesListPage";

export interface SpeciesListProviderProps {}
/**
 * Component that renders a species list with data from the graphql API.
 */
export const SpeciesListProvider: FC<SpeciesListProviderProps> = () => {
  const [searchText, setSearchText] = useState("");

  const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearchText(e.target.value);
    },
    [setSearchText]
  );

  const { data, loading } = useGetSpeciesListViewQuery({
    variables: {
      name: searchText,
    },
  });

  const [selectedSpecies, setSelectedSpecies] = useState<
    ListViewSpecies | undefined
  >(undefined);

  const [detailTransition, setDetailTransition] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [awaitingTransition, setAwaitingTransition] = useState(false);

  const handleRowClick = useCallback<SpeciesEventHandler>(
    (species) => {
      if (species.id === selectedSpecies?.id) {
        setAwaitingTransition(true);
        setDetailTransition(false);
      } else {
        setSelectedSpecies(species);
        setDetailTransition(true);
        setShowDetail(true);
        setAwaitingTransition(false);
      }
    },
    [
      selectedSpecies,
      setSelectedSpecies,
      setDetailTransition,
      setAwaitingTransition,
    ]
  );

  const handleTransitionEnd = useCallback(() => {
    if (awaitingTransition) {
      setAwaitingTransition(false);
      setSelectedSpecies(undefined);
      setShowDetail(false);
    }
  }, [
    awaitingTransition,
    setShowDetail,
    setAwaitingTransition,
    setSelectedSpecies,
  ]);

  if (!loading && !data) {
    throw new Error("Error fetching data for species list view");
  }

  return (
    <SpeciesListPage
      headerBarProps={{
        userIconUrl: "http://placekitten.com/200/200",
        userName: "Provinite",
      }}
      speciesListProps={{
        onRowClick: handleRowClick,
        selectedSpecies,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        species: loading ? [] : data!.species,
      }}
      searchInputProps={{
        onChange: onSearchTextChange,
        value: searchText,
      }}
      detailViewTransition={detailTransition}
      showDetailView={showDetail}
      onDetailViewTransitionEnd={handleTransitionEnd}
      speciesDetailProps={{
        species: selectedSpecies,
      }}
    />
  );
};
