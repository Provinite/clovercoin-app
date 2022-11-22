import * as React from "react";
import { FC, HTMLAttributes } from "react";
import { StyleSheet, css } from "aphrodite";
import { StyleProps } from "../aphrodite/StyleProps";

export interface GridCellProps
  extends StyleProps,
    HTMLAttributes<HTMLDivElement> {}

const ss = StyleSheet.create({
  root: {},
});

export const GridCell: FC<GridCellProps> = ({
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
