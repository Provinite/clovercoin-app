import * as React from "react";
import { FC } from "react";
import { StyleSheet, css } from "aphrodite";
import { FaQuestionCircle } from "react-icons/fa";
import { dimYellow } from "../lib/styles/colors";
import { borderRadius } from "../lib/styles/misc";
export interface HelpTextProps {}

const ss = StyleSheet.create({
  root: {
    fontStyle: "italic",
    fontSize: "14px",
    borderRadius: borderRadius,
    backgroundColor: dimYellow,
    padding: "16px",
    display: "inline-block",
    lineHeight: "100%",
  },
  icon: {
    marginRight: "8px",
    verticalAlign: "middle",
  },
  text: {
    verticalAlign: "middle",
  },
});

export const HelpText: FC<HelpTextProps> = ({ children }) => {
  return (
    <p className={css(ss.root)}>
      <FaQuestionCircle size="24" className={css(ss.icon)} />
      <span className={css(ss.text)}>{children}</span>
    </p>
  );
};
