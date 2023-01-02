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
import { GridRow } from "../../lib/GridRow";

export const TraitListCard: FunctionComponent = () => {
  const data = useRouteTraits();
  const species = useRouteSpecies();
  const fetcher = useFetcher();
  const community = useRouteCommunity();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [traitToDelete, setTraitToDelete] =
    useState<typeof data["traits"][number]>();

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
