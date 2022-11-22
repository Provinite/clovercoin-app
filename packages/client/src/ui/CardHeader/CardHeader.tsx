import * as React from "react";
import { FC, ReactNode } from "react";
import { StyleSheet, css } from "aphrodite";
import { Typography } from "@mui/material";

export interface CardHeaderProps {}

const ss = StyleSheet.create({
  root: {
    marginTop: "8px",
    marginBottom: "8px",
    marginRight: "16px",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export const CardTitle: FC<CardHeaderProps> = ({ children }) => {
  return (
    <Typography component="div" variant="h4" marginRight={4}>
      {children}
    </Typography>
  );
};

export const CardHeaderRow: FC<{ children?: ReactNode }> = ({ children }) => (
  <div className={css(ss.headerRow)}>{children}</div>
);
