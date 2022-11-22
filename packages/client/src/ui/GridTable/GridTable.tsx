import * as React from "react";
import { FC, HTMLAttributes } from "react";
import { StyleSheet, css } from "aphrodite";
import { StyleProps } from "../aphrodite/StyleProps";

export interface GridTableProps
  extends StyleProps,
    HTMLAttributes<HTMLDivElement> {}

const ss = StyleSheet.create({
  root: {
    display: "grid",
  },
});

export const GridTable: FC<GridTableProps> = ({
  styles = [],
  children,
  ...rest
}) => {
  return (
    <div {...rest} className={css(ss.root, ...styles)}>
      {children}
    </div>
  );
};
