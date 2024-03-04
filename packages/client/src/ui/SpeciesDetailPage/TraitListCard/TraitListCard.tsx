import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useRouteSpeciesOrFail } from "../useRouteSpecies";
import TuneIcon from "@mui/icons-material/Tune";
import { useRouteTraitsOrFail } from "../useRouteTraits";
import { useFetcher } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouteCommunityOrFail } from "../../../useRouteCommunity";
import { AppRoutes } from "../../AppRoutes";
import { GridRow } from "../../lib/GridRow";
import { Link } from "../../Link/Link";
import { useSnackbar } from "../../SequentialSnackbar/SequentialSnackbarContext";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { AppAlert } from "../../SequentialSnackbar/AppAlert";

export const TraitListCard: FunctionComponent = () => {
  const data = useRouteTraitsOrFail();
  const species = useRouteSpeciesOrFail();
  const fetcher = useFetcher();
  const community = useRouteCommunityOrFail();
  usePageTitle(`${community.name} - ${species.name} Traits`);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [traitToDelete, setTraitToDelete] =
    useState<typeof data["list"][number]>();

  const [loading, setLoading] = useState(false);
  const snackbarQueue = useSnackbar();

  useEffect(() => {
    if (fetcher.state !== "idle") {
      setLoading(true);
    } else if (fetcher.state === "idle" && loading) {
      setLoading(false);
      snackbarQueue.append({
        children: (
          <AppAlert
            severity="success"
            snackbarQueue={snackbarQueue}
            text="Trait Deleted"
          />
        ),
      });
    }
  }, [fetcher, snackbarQueue.append]);
  return (
    <Card elevation={1}>
      <CardHeader
        title={`${species.name} - Traits`}
        action={
          <Link to={AppRoutes.speciesTraitAdd(community.id, species.id)}>
            <Button variant="contained">Add One</Button>
          </Link>
        }
        subheader={`All traits available to ${species.name} are listed here.`}
      />
      <CardContent>
        <Grid container component={Box}>
          <GridRow xs={[3, 3, 6]} xl={[3, 3, 6]}>
            <Typography p={1} variant="body1" color="text.secondary">
              Trait
            </Typography>
            <Typography p={1} variant="body1" color="text.secondary">
              Type
            </Typography>
            <></>
          </GridRow>
          {data.list.map((t) => {
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
                    setTraitToDelete(t);
                    setShowConfirmDialog(true);
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
      <Dialog
        TransitionProps={{
          onExited: () => setTraitToDelete(undefined),
        }}
        open={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
        }}
      >
        <DialogTitle>
          Delete trait "{traitToDelete?.name ?? "trait"}"?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the "
            {traitToDelete?.name ?? "trait"}" trait? This will remove the trait
            from all {species.name} variant trait lists and all {species.name}
          </DialogContentText>
          <br />
          <DialogContentText>This action cannot be undone.</DialogContentText>
          <DialogActions>
            <Button onClick={() => setShowConfirmDialog(false)}>No</Button>
            <Button
              onClick={() => {
                setShowConfirmDialog(false);
                fetcher.submit(null, {
                  action: AppRoutes.speciesTraitDetail(
                    community.id,
                    species.id,
                    traitToDelete!.id
                  ),
                  method: "delete",
                });
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
