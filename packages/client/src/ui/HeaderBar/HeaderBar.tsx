import { FC } from "react";
import * as React from "react";
import { css, StyleSheet } from "aphrodite";
import { UserNameDisplay } from "../UserNameDisplay/UserNameDisplay";
import { MediaQueries } from "../lib/MediaQueries";
import { UserIcon, UserIconSize } from "../UserIcon/UserIcon";
export interface HeaderBarProps {
  title?: string;
  userName?: string;
  userIconUrl?: string;
}
export const HeaderBar: FC<HeaderBarProps> = ({
  title,
  userName,
  userIconUrl,
}) => {
  const stylesheet = StyleSheet.create({
    container: {
      display: "flex",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      padding: "8px",
      flexGrow: 1,
      [MediaQueries.xs]: {
        flexDirection: "column",
        alignItems: "flex-start",
        whiteSpace: "nowrap",
        alignContent: "stretch",
        width: "100%",
      },
      [MediaQueries.m]: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "76px",
      },
    },
    title: {
      display: "flex",
      fontFamily: "Roboto",
      fontSize: "32px",
      flexGrow: 1,
    },
    user: {
      display: "flex",
      flexDirection: "row",
      minWidth: 0,
      alignItems: "center",
      [MediaQueries.xs]: {
        flexGrow: 1,
        maxWidth: "100%",
      },
      [MediaQueries.m]: {
        maxWidth: "50%",
        textAlign: "right",
      },
    },
    userNameDisplay: {
      paddingRight: `16px`,
    },
  });
  return (
    <div className={css(stylesheet.container)}>
      <div className={css(stylesheet.title)}>{title}</div>
      <div className={css(stylesheet.user)}>
        {userName && (
          <UserNameDisplay
            name={userName}
            styles={stylesheet.userNameDisplay}
          />
        )}
        {userIconUrl && (
          <UserIcon
            url={userIconUrl}
            size={UserIconSize.small}
            onClick={() => {}}
          />
        )}
      </div>
    </div>
  );
};
