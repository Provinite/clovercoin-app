import { Theme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FC, FunctionComponent, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
import { GetSpeciesTraitsQuery } from "../../../generated/graphql";
import { AddBadge } from "../../AddBadge/AddBadge";
import { useRouteSpecies } from "../useRouteSpecies";

export const TraitListCard: FunctionComponent = () => {
  const data = useLoaderData() as GetSpeciesTraitsQuery;
  const species = useRouteSpecies();
  return (
    <Card elevation={1}>
      <CardHeader
        title={`${species.name} - Traits`}
        action={<AddBadge to="./add">Add One</AddBadge>}
        subheader={`All traits available to ${species.name} are listed here.`}
      ></CardHeader>
      <CardContent>
        <Grid container component={Box}>
          <GridRow xs={[3, 3, 6]}>
            <Typography p={1} variant="body1" color="text.secondary">
              Name
            </Typography>
            <Typography p={1} variant="body1" color="text.secondary">
              Type
            </Typography>
            <></>
          </GridRow>
          {data.traits.map((t, i) => (
            <GridRow xs={[3, 3, 6]} key={t.id}>
              <Typography p={2} variant="body1" key="name">
                {t.name}
              </Typography>
              <Typography p={2} variant="body1" key="valueType">
                {t.valueType}
              </Typography>
              {/* <ButtonBase css={{ alignSelf: "stretch", flexGrow: 1 }} /> */}
              <></>
            </GridRow>
          ))}
        </Grid>
        <br />
        <DataGrid<typeof data["traits"][number]>
          rows={data.traits}
          columns={[{ field: "name" }, { field: "valueType" }]}
        ></DataGrid>
      </CardContent>
    </Card>
  );
};

const ss = {
  gridRow: (theme: Theme) => ({
    display: "contents",
    ":hover": {
      "& .MuiGrid-item": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
  gridRowActive: (theme: Theme) => ({
    "& .MuiGrid-item": {
      backgroundColor: theme.palette.action.selected,
    },
  }),
};

const GridRow: FC<{
  children?: ReactNode[];
  xs: number[];
  selected?: boolean;
}> = ({ children, xs, selected = false }) => {
  return (
    <Box css={[ss.gridRow, selected ? ss.gridRowActive : null]}>
      {children?.map((c, i) => {
        return (
          <Grid
            item
            xs={xs[i]}
            key={i}
            css={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {c}
            <Divider css={{ display: "block" }} />
          </Grid>
        );
      })}
    </Box>
  );
};
