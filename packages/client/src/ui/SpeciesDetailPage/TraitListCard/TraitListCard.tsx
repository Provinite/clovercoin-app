import { Theme } from "@emotion/react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { FC, FunctionComponent, ReactNode, useEffect, useState } from "react";
import { AddBadge } from "../../AddBadge/AddBadge";
import { useRouteSpecies } from "../useRouteSpecies";
import TuneIcon from "@mui/icons-material/Tune";
import { useRouteTraits } from "../useRouteTraits";
import { Link as RouterLink, useFetcher } from "react-router-dom";
import { Link } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { AppRoutes } from "../../AppRoutes";
import {
  SequentialSnackbar,
  useSnackbarQueue,
} from "../../SequentialSnackbar/SequentialSnackbar";
export const TraitListCard: FunctionComponent = () => {
  const data = useRouteTraits();
  const species = useRouteSpecies();
  const fetcher = useFetcher();
  const community = useRouteCommunity();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (fetcher.state !== "idle") {
      setLoading(true);
    } else if (fetcher.state === "idle" && loading) {
      setLoading(false);
      snackbarQueue.append({
        children: (
          <Alert
            css={{ width: "100%" }}
            severity="success"
            onClose={snackbarQueue.close}
          >
            Trait Deleted
          </Alert>
        ),
      });
    }
  }, [fetcher]);
  const snackbarQueue = useSnackbarQueue();
  return (
    <Card elevation={1}>
      <SequentialSnackbar queue={snackbarQueue} />
      <CardHeader
        title={`${species.name} - Traits`}
        action={
          <AddBadge to={AppRoutes.speciesTraitAdd(community.id, species.id)}>
            Add One
          </AddBadge>
        }
        subheader={`All traits available to ${species.name} are listed here.`}
      ></CardHeader>
      <CardContent>
        <Grid container component={Box}>
          <GridRow xs={[3, 3, 6]} xl={[3, 3, 6]}>
            <Typography p={1} variant="body1" color="text.secondary">
              Name
            </Typography>
            <Typography p={1} variant="body1" color="text.secondary">
              Type
            </Typography>

            <></>
          </GridRow>
          {data.traits.map((t) => {
            return (
              <GridRow xs={[3, 3, 3, 3, 0]} xl={[3, 3, 1, 1, 4]} key={t.id}>
                <Typography p={2} variant="body1" key="name">
                  {t.name}
                </Typography>

                <Typography p={2} variant="body1" key="valueType">
                  {t.valueType}
                </Typography>

                {fetcher.state !== "idle" ? (
                  <LoadingButton
                    loading={true}
                    css={(theme) => ({
                      padding: theme.spacing(1),
                      justifyContent: "flex-start",
                      flexGrow: 1,
                    })}
                    loadingPosition="start"
                    startIcon={<TuneIcon />}
                  >
                    Edit
                  </LoadingButton>
                ) : (
                  <Link
                    css={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    component={RouterLink}
                    to={AppRoutes.speciesTraitDetail(
                      community.id,
                      species.id,
                      t.id
                    )}
                  >
                    <LoadingButton
                      css={(theme) => ({
                        padding: theme.spacing(1),
                        justifyContent: "flex-start",
                        flexGrow: 1,
                      })}
                      startIcon={<TuneIcon />}
                    >
                      Edit
                    </LoadingButton>
                  </Link>
                )}
                <LoadingButton
                  color="error"
                  loading={fetcher.state !== "idle"}
                  loadingPosition="start"
                  css={(theme) => ({
                    padding: theme.spacing(1),
                    justifyContent: "flex-start",
                    flexGrow: 1,
                  })}
                  onClick={() => {
                    fetcher.submit(null, {
                      method: "delete",
                      action: AppRoutes.speciesTraitDetail(
                        community.id,
                        species.id,
                        t.id
                      ),
                    });
                  }}
                  startIcon={<DeleteOutlineIcon />}
                >
                  Delete
                </LoadingButton>
                <></>
              </GridRow>
            );
          })}
        </Grid>
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
  xs?: number[];
  sm?: number[];
  selected?: boolean;
  md?: number[];
  lg?: number[];
  xl?: number[];
}> = ({
  children,
  xs = [],
  sm = [],
  md = [],
  lg = [],
  xl = [],
  selected = false,
}) => {
  return (
    <Box css={[ss.gridRow, selected ? ss.gridRowActive : null]}>
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
