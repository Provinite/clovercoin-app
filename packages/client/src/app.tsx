import React from "react";
import { FunctionComponent } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./app.scss";

export const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Route path="/species"></Route>
    </BrowserRouter>
  );
};
render(<App />, document.querySelector("#app"));
