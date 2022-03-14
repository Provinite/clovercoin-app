import * as React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import {
  VscCircuitBoard,
  VscFile,
  VscFiles,
  VscQuestion,
} from "react-icons/vsc";
import "./AppSidebar.scss";
export const AppSidebar: FunctionComponent = () => {
  return (
    <div className="app--sidebar">
      <div className="sidebar--icon"> </div>
      <div className="sidebar--header">Welcome, Prov</div>
      <nav className="sidebar--list">
        <Link to="/">
          <VscCircuitBoard className="sidebar--icon" />
          Dashboard
        </Link>
        <Link to="/species">
          <VscFiles className="sidebar--icon" />
          Species
        </Link>
        <Link to="/critters">
          <VscFile className="sidebar--icon" />
          Critters
        </Link>
        <Link to="/help">
          <VscQuestion className="sidebar--icon" />
          Help
        </Link>
      </nav>
    </div>
  );
};
