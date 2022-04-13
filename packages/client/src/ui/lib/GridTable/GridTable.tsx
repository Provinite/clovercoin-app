import * as React from "react";
import { FC } from "react";
import { StyleSheet } from "aphrodite";
export interface GridTableProps {
  numCols: number;
}

export const GridTable: FC<GridTableProps> = ({ numCols }) => {
  const stylesheet = StyleSheet.create({
    container: {
      display: "grid",
      gridTemplateColumns: `repeat(${numCols} 1fr)`,
    },
  });
  return <></>;
};
