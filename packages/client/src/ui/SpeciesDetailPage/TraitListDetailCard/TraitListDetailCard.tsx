import {
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
  Switch,
  Typography,
} from "@mui/material";
import { FC, FunctionComponent, HTMLProps, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { stylesheet } from "../../../utils/emotion";
import { useRouteLoaderData } from "../../../utils/loaderDataUtils";
import { AppRoutes } from "../../AppRoutes";
import { GridRow } from "../../lib/GridRow";
import { With } from "../../util/With";
import { useRouteSpecies } from "../useRouteSpecies";
import { useRouteVariant } from "../useRouteTraitList";

export const TraitListDetailCard: FunctionComponent = () => {
  const variant = useRouteVariant();
  const species = useRouteSpecies();
  const community = useRouteCommunity();
  const allTraits = useRouteLoaderData("root.community.species.variant");
  const [showConfirmAddDialog, setShowConfirmAddDialog] = useState(false);
  const [traitListEntryToRemove, setTraitListEntryToRemove] =
    useState<typeof variant["traitListEntries"][number]>();
  const [showConfirmRemoveDialog, setShowConfirmRemoveDialog] = useState(false);
  const [traitToAdd, setTraitToAdd] =
    useState<typeof allTraits["traits"][number]>();
  const fetcher = useFetcher();

  const findTraitListEntry = (traitId: string) =>
    variant.traitListEntries.find((tle) => tle.trait.id === traitId);

  return (
    <Card elevation={1}>
      <CardHeader
        title={`${species.name}: Variant - ${variant.name}`}
        subheader="Set up traits for this variant here"
      />
      <CardContent>
        <Grid container component={Box}>
          {/* Headers */}
          <GridRow xs={[3, 2, 2, 5]}>
            <TextStack primary={"Name"} secondary={"Type"} css={ss.header} />
            <TextStack primary={"Order"} css={ss.header} />
            <TextStack primary={"Required"} css={ss.header} />
            <TextStack primary={"Enabled"} css={ss.header} />
          </GridRow>
          {/* Trait rows */}
          {allTraits.traits.map((trait) => (
            <With value={() => findTraitListEntry(trait.id)} key={trait.id}>
              {(tle) => (
                <GridRow xs={[3, 2, 2, 5]}>
                  {/* Name & Type */}
                  <TextStack
                    css={ss.gridItem}
                    primary={trait.name}
                    secondary={trait.valueType}
                  />
                  {/* Order */}
                  <div css={ss.gridItem}>
                    <Typography variant="body1">{tle?.order ?? ""}</Typography>
                  </div>
                  {/* Required */}
                  <div css={ss.gridItem}>
                    <Switch
                      disabled={!tle}
                      checked={tle?.required ?? false}
                      onChange={() => {
                        if (!tle) {
                          return;
                        }
                      }}
                    />
                  </div>
                  {/* Enabled */}
                  <div css={ss.gridItem}>
                    <Switch
                      color="success"
                      checked={Boolean(tle)}
                      onChange={() => {
                        if (!tle) {
                          setTraitToAdd(trait);
                          setShowConfirmAddDialog(true);
                        } else {
                          setTraitListEntryToRemove(tle);
                          setShowConfirmRemoveDialog(true);
                        }
                      }}
                    />
                  </div>
                </GridRow>
              )}
            </With>
          ))}
        </Grid>
      </CardContent>
      {/* Confirm add Dialog */}
      <Dialog
        TransitionProps={{ onExited: () => setTraitToAdd(undefined) }}
        open={showConfirmAddDialog}
      >
        <DialogTitle>
          Add "{traitToAdd?.name}" trait to {variant.name} {species.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the "{traitToAdd?.name}" trait to the trait list for the{" "}
            {variant.name} variant {species.name}?
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => {
                setShowConfirmAddDialog(false);
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                fetcher.submit(
                  {
                    traitId: traitToAdd!.id,
                  },
                  {
                    method: "post",
                    action: AppRoutes.speciesVariantDetail(
                      community.id,
                      species.id,
                      variant.id
                    ),
                  }
                );

                setShowConfirmAddDialog(false);
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/* Confirm removal dialog */}
      <Dialog
        TransitionProps={{
          onExited: () => setTraitListEntryToRemove(undefined),
        }}
        open={showConfirmRemoveDialog}
      >
        <DialogTitle>
          Remove "{traitListEntryToRemove?.trait.name}" trait from all{" "}
          {variant.name} {species.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove the trait from all {variant.name}{" "}
            {species.name}. This action cannot be undone.
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => {
                setShowConfirmRemoveDialog(false);
              }}
            >
              No, go back
            </Button>
            <Button
              color="error"
              onClick={() => {
                fetcher.submit(null, {
                  action: traitListEntryToRemove
                    ? AppRoutes.speciesVariantTraitListEntryDetail(
                        community.id,
                        species.id,
                        variant.id,
                        traitListEntryToRemove.id
                      )
                    : "",
                });
                setShowConfirmRemoveDialog(false);
              }}
            >
              Yes, delete this trait
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const TextStack: FC<
  {
    primary: string;
    secondary?: string;
    className?: string;
  } & HTMLProps<HTMLDivElement>
> = ({ primary, secondary, ...rest }) => {
  return (
    <div {...rest}>
      <Typography variant="body1">{primary}</Typography>
      <Typography
        variant="body2"
        css={(theme) => ({ color: theme.palette.text.secondary })}
      >
        {secondary ?? "\u00A0"}
      </Typography>
    </div>
  );
};

const ss = stylesheet({
  header: (theme) => ({
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }),
  gridItem: (theme) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),
});
