import { Box, Grid, Divider } from "@mui/material";
import { FC, ReactNode } from "react";
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
});

export const GridRow: FC<{
  children?: ReactNode[];
  xs?: number[];
  sm?: number[];
  selected?: boolean;
  md?: number[];
  lg?: number[];
  xl?: number[];
  className?: string;
}> = ({
  children,
  xs = [],
  sm = [],
  md = [],
  lg = [],
  xl = [],
  selected = false,
  className,
}) => {
  return (
    <Box css={[className, ss.gridRow, selected ? ss.gridRowActive : null]}>
      {children?.map((c, i) => {
        const gridProps = {
          xs: xs[i],
          sm: sm[i],
          md: md[i],
          lg: lg[i],
          xl: xl[i],
        };

        return (
          <Grid
            item
            key={i}
            css={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              overflowX: "hidden",
            }}
            {...gridProps}
          >
            {c}
            <Divider css={{ display: "block" }} />
          </Grid>
        );
      })}
    </Box>
  );
};
