import * as React from "react";
import { FunctionComponent } from "react";
import "./AppTopbar.scss";
import { VscAccount } from "react-icons/vsc";
export const AppTopbar: FunctionComponent = () => {
  return (
    <div className="app--topbar">
      <div className="topbar--breadcrumbs">
        <div className="topbar--breadcrumb">Dashboard</div>
      </div>
      <div className="topbar--user">
        <span className="topbar--username">Prov</span>
        <VscAccount className="topbar--user-icon" />
      </div>
    </div>
  );
};
