import { Box, Grid, Divider } from "@mui/material";
import { forwardRef, ReactNode } from "react";
import { stylesheet } from "../../utils/emotion";

const ss = stylesheet({
  gridRow: (theme) => ({
    display: "contents",
    ":hover": {
      "& .MuiGrid-item": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
  gridRowActive: (theme) => ({
    "& .MuiGrid-item": {
      backgroundColor: theme.palette.action.selected,
    },
  }),
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflowX: "hidden",
  },
  divider: {
    display: "block",
  },
});

export const GridRow = forwardRef<
  HTMLDivElement,
  {
    children?: ReactNode[];
    xs?: number[];
    sm?: number[];
    selected?: boolean;
    md?: number[];
    lg?: number[];
    xl?: number[];
    className?: string;
    divider?: boolean;
  }
>(
  (
    {
      children,
      xs = [],
      sm = [],
      md = [],
      lg = [],
      xl = [],
      selected = false,
      className,
      divider = true,
    },
    ref
  ) => {
    return (
      <Box
        className={className}
        css={[ss.gridRow, selected ? ss.gridRowActive : null]}
      >
        {(() => {
          let settingIndex = 0;
          return children?.map((c) => {
            if (!c) {
              return;
            }
            const gridProps = {
              xs: xs[settingIndex],
              sm: sm[settingIndex],
              md: md[settingIndex],
              lg: lg[settingIndex],
              xl: xl[settingIndex],
            };

            settingIndex++;

            return (
              <Grid
                ref={ref}
                item
                key={settingIndex}
                css={ss.item}
                {...gridProps}
              >
                {c}
                {divider && <Divider css={ss.divider} />}
              </Grid>
            );
          });
        })()}
      </Box>
    );
  }
);

GridRow.displayName = "GridRow";
