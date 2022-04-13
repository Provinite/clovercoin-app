import { FC } from "react";
import * as React from "react";
import { css, StyleSheet } from "aphrodite";
import { Circle } from "../../Circle/Circle";
import { MouseEventHandler } from "react";

export enum UserIconSize {
  /**
   * 60px
   */
  small = "small",
  /**
   * 100px
   */
  medium = "medium",
  /**
   * 200px
   */
  large = "large",
}

export enum UserIconSizePx {
  small = 60,
  medium = 100,
  large = 200,
}
export interface UserIconProps {
  url?: string;
  size?: UserIconSize;
  onClick?: MouseEventHandler;
}
export const UserIcon: FC<UserIconProps> = ({
  url = "",
  size = UserIconSize.medium,
  onClick,
}) => {
  const width = { large: "200px", medium: "100px", small: "60px" };
  const height = { ...width };

  const stylesheet = StyleSheet.create({
    croppedImage: {
      borderRadius: "50%",
      width: width[size],
      height: height[size],
    },
    outline: {
      border: "2px solid black",
      cursor: onClick ? "pointer" : undefined,
      maxWidth: "100%",
    },
  });
  return url ? (
    <img
      src={url}
      className={css(stylesheet.croppedImage, stylesheet.outline)}
      onClick={onClick}
    />
  ) : (
    <Circle
      color="primary"
      radius={parseInt(width[size]) / 2}
      styles={stylesheet.outline}
    />
  );
};
