import * as React from "react";
import { FC } from "react";
import { StyleSheet, css } from "aphrodite";
import { Color } from "../styles/colors";
import { StyleProps } from "../../aphrodite/StyleProps";

export interface PageProps extends StyleProps {}

const ss = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100%",
    overflowX: "hidden",
    paddingBottom: "16px",
    backgroundColor: Color.List.activeRow,
  },
});

/**
 * Full page display column flex container.
 */
export const Page: FC<PageProps> = ({ children, styles = [] }) => {
  return <div className={css(ss.root, ...styles)}>{children}</div>;
};
