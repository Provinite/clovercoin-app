import * as React from "react";
import { FC } from "react";
import { css, StyleSheet } from "aphrodite";
export interface GridTableProps {
  numCols: number;
}

export const GridTable: FC<GridTableProps> = ({ numCols, children }) => {
  const stylesheet = StyleSheet.create({
    container: {
      display: "grid",
      gridTemplateColumns: `repeat(${numCols}, 1fr)`,
      gridAutoRows: `1fr`,
    },
  });
  return <div className={css(stylesheet.container)}>{children}</div>;
};

export const GridRow: FC = ({ children }) => {
  return <div>{children}</div>;
};
