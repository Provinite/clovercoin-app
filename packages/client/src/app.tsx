import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { FunctionComponent } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import { SpeciesListProvider } from "./ui/SpeciesListPage/SpeciesListProvider";

const client = new ApolloClient({
  uri: "http://localhost:3000/",
  cache: new InMemoryCache(),
});

export const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/species" element={<SpeciesListProvider />}></Route>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
};
render(<App />, document.querySelector("#app"));
