import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { stylesheet } from "../../utils/emotion";

export interface PrettyPrintJsonProps {
  value: unknown;
  replacer?: (this: any, key: string, value: any) => any;
  space?: number;
  stringify?: (obj: unknown) => string;
  className?: string;
}

const ss = stylesheet({
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
  className,
}) => {
  const [json, setJson] = useState("");
  useEffect(() => {
    setJson(stringify(value, replacer, space));
  }, [value, replacer, space]);
  return (
    <pre css={ss.root} className={className}>
      {json}
    </pre>
  );
};
