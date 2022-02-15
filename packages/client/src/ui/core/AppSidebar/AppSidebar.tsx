import * as React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./AppSidebar.scss";
export const AppSidebar: FunctionComponent = () => {
  return (
    <div className="app--sidebar">
      <div className="sidebar--icon"> </div>
      <div className="sidebar--header">Welcome, Prov</div>
      <nav className="sidebar--list">
        <Link to="/">Dashboard</Link>
        <Link to="/species">Species</Link>
        <Link to="/critters">Critters</Link>
        <Link to="/help">Help</Link>
      </nav>
    </div>
  );
};
