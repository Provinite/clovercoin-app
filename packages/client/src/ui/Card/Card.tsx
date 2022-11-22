import * as React from "react";
import { FC, HTMLAttributes } from "react";
import { StyleSheet, css } from "aphrodite";
import { StyleProps } from "../aphrodite/StyleProps";

export interface CardProps extends StyleProps, HTMLAttributes<HTMLDivElement> {}

const ss = StyleSheet.create({
  root: {
    backgroundColor: "white",
    padding: "16px",
  },
});

export const Card: FC<CardProps> = ({ children, styles = [], ...rest }) => {
  return (
    <div className={css(ss.root, ...styles)} {...rest}>
      {children}
    </div>
  );
};
