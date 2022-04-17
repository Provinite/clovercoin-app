import * as React from "react";
import { FC } from "react";
import { StyleSheet, css } from "aphrodite";
import { StyleProps } from "../aphrodite/StyleProps";
import { borderRadius } from "../lib/styles/misc";

export interface CardProps extends StyleProps {}

const ss = StyleSheet.create({
  root: {
    backgroundColor: "white",
    padding: "16px",
    borderRadius,
  },
});

export const Card: FC<CardProps> = ({ children, styles = [] }) => {
  return <div className={css(ss.root, ...styles)}>{children}</div>;
};
