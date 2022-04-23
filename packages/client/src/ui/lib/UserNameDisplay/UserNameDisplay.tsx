import { FC } from "react";
import * as React from "react";
import { css, StyleDeclarationValue, StyleSheet } from "aphrodite";
import { MediaQuery } from "../MediaQueries";

export interface UserNameDisplayProps {
  name: string;
  styles?: StyleDeclarationValue;
}
export const UserNameDisplay: FC<UserNameDisplayProps> = ({ name, styles }) => {
  const stylesheet = StyleSheet.create({
    usernameText: {
      flexGrow: 1,
      fontSize: "24px",
      fontFamily: "Roboto",
      [MediaQuery.xs]: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        minWidth: 0,
      },
    },
  });
  return <div className={css(stylesheet.usernameText, styles)}>{name}</div>;
};
