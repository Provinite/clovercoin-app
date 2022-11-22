import { css, StyleSheet } from "aphrodite";
import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";

export interface PrettyPrintJsonProps {
  value: unknown;
  replacer?: (this: any, key: string, value: any) => any;
  space?: number;
  stringify?: (obj: unknown) => string;
}

const ss = StyleSheet.create({
  root: {
    fontFamily: "monospace",
  },
});

/**
 * Debug component, renders some nice-looking json.
 */
export const PrettyPrintJson: FunctionComponent<PrettyPrintJsonProps> = ({
  value,
  replacer,
  space = 2,
  stringify = JSON.stringify,
}) => {
  const [json, setJson] = useState("");
  useEffect(() => {
    setJson(stringify(value, replacer, space));
  }, [value, replacer, space]);
  return <pre className={css(ss.root)}>{json}</pre>;
};
