import * as React from "react";
import { FunctionComponent } from "react";
import { css, StyleDeclarationValue, StyleSheet } from "aphrodite";

export interface CircleProps {
  radius: number;
  styles?: object[];
}

export const Circle: FunctionComponent<CircleProps> = ({
  radius,
  styles = [],
}) => {
  const styleSheet = StyleSheet.create({
    circle: {
      borderRadius: `${radius}px`,
      width: `${2 * radius}px`,
      height: `${2 * radius}px`,
      display: "flex",
    },
  });

  return <div className={css(styleSheet.circle, ...styles)}> </div>;
};
