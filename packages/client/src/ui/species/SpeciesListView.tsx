import { Dialog } from "../lib/Dialog/Dialog";
import * as React from "react";
import { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import { api } from "../../api";
import { GetSpeciesListViewQuery } from "../../generated/graphql";
import { DataTable } from "../lib/DataTable/DataTable";

import "./SpeciesListView.scss";
import { TextInput } from "../lib/input/TextInput/TextInput";

export const SpeciesListView: FunctionComponent = () => {
  const [species, setSpecies] = useState<GetSpeciesListViewQuery["species"]>(
    []
  );

  const dialogProps = useDialog(false);

  useEffect(() => {
    (async () => {
      const { species } = await api.getSpeciesListView();
      setSpecies([
        ...species,
        ...species,
        ...species,
        ...species,
        ...species,
        ...species,
        ...species,
        ...species,
        ...species,
        ...species,
      ]);
    })();
  }, []);

  return (
    <div className="species-list-view">
      <DataTable
        classes={{ root: "species-list-view--table" }}
        columns={[
          {
            name: "Name",
            selector: (s) => s.name,
            width: 10,
          },
          {
            name: "Actions",
            selector: () => "[X] [E]",
            width: 2,
          },
        ]}
        data={species}
      />
      <button onClick={dialogProps.onOpen}>Booton</button>
      <Dialog
        title={"Add Species"}
        {...dialogProps}
        className="add-species-dialog"
      >
        <label>
          Name
          <TextInput />
        </label>
      </Dialog>
    </div>
  );
};

function useDialog(initialValue: boolean): {
  isOpen: boolean;
  toggle: () => void;
  onOpen: () => void;
  onClose: () => void;
} {
  const [isOpen, setIsOpen] = useState(initialValue);

  return {
    isOpen,
    toggle: () => setIsOpen((open) => !open),
    onClose: () => setIsOpen(false),
    onOpen: () => setIsOpen(true),
  };
}
