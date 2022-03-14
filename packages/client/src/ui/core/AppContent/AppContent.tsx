import * as React from "react";
import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { SpeciesListView } from "../../species/SpeciesListView";
import "./AppContent.scss";
export const AppContent: FunctionComponent = () => {
  return (
    <div className="app--content">
      <Routes>
        <Route path="/" />
        <Route path="/species" element={<SpeciesListView />} />
      </Routes>
    </div>
  );
};
