import { css } from "aphrodite";
import * as React from "react";
import { FC } from "react";
import { useHover } from "../../hooks/useHover";
import { stylesheet } from "./SpeciesList.stylesheet";

export interface GridStateRowProps extends React.HTMLProps<HTMLDivElement> {
  children: (state: {
    isHovering: boolean;
  }) => React.ReactElement | React.ReactElement[];
}

export const GridStateRow: FC<GridStateRowProps> = ({ children, ...rest }) => {
  const [isHovering, hoverProps] = useHover();
  return (
    <div className={css(stylesheet.gridRow)} {...hoverProps} {...rest}>
      {children({
        isHovering,
      })}
    </div>
  );
};
