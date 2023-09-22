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
        {children?.map((c, i) => {
          if (!c) {
            return;
          }
          const gridProps = {
            xs: xs[i],
            sm: sm[i],
            md: md[i],
            lg: lg[i],
            xl: xl[i],
          };

          return (
            <Grid ref={ref} item key={i} css={ss.item} {...gridProps}>
              {c}
              {divider && <Divider css={ss.divider} />}
            </Grid>
          );
        })}
      </Box>
    );
  }
);

GridRow.displayName = "GridRow";
