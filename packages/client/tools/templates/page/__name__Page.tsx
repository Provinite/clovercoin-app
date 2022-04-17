import * as React from "react";
import { FC } from "react";
import { StyleSheet, css } from "aphrodite";

export interface __name__PageProps {}

const ss = StyleSheet.create({
  root: {},
});

export const __name__Page: FC<__name__PageProps> = () => {
  return <div className={css(ss.root)}></div>;
};
