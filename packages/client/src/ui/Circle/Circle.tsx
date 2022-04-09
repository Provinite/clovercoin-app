import * as React from "react";
import { FunctionComponent } from "react";
import { css, StyleDeclarationValue, StyleSheet } from "aphrodite";
import { useTheme } from "../hooks/useTheme";
import { ThemeContextType } from "../hooks/ThemeContext";

export interface CircleProps {
  radius: number;
  color: keyof ThemeContextType["colors"];
  styles?: StyleDeclarationValue;
}

export const Circle: FunctionComponent<CircleProps> = ({
  radius,
  color,
  styles,
}) => {
  const theme = useTheme();
  const styleSheet = StyleSheet.create({
    circle: {
      borderRadius: `${radius}px`,
      width: `${2 * radius}px`,
      height: `${2 * radius}px`,
      display: "flex",
      backgroundColor: theme?.colors[color || "primary"] || "red",
    },
  });

  return <div className={css(styleSheet.circle, styles)}> </div>;
};
