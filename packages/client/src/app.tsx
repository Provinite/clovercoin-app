import React from "react";
import { FunctionComponent } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./app.scss";
import { AppContent } from "./ui/core/AppContent/AppContent";
import { AppSidebar } from "./ui/core/AppSidebar/AppSidebar";
import { AppTopbar } from "./ui/core/AppTopbar/AppTopbar";

export const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppSidebar />
        <div className="app--right">
          <AppTopbar />
          <AppContent />
        </div>
      </div>
    </BrowserRouter>
  );
};
render(<App />, document.querySelector("#app"));
