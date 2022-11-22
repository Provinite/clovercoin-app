import { FunctionComponent, ReactNode } from "react";
import * as React from "react";
export interface IfProps {
  condition: boolean;
  children: ReactNode;
}
export const If: FunctionComponent<IfProps> = ({ condition, children }) =>
  condition ? <>{children}</> : <></>;
