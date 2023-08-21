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
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { stylesheet } from "../../../utils/emotion";
import { useRouteLoaderData } from "../../../utils/loaderDataUtils";
import { AppRoutes } from "../../AppRoutes";
import { GridRow } from "../../lib/GridRow";
import { With } from "../../util/With";
import { useRouteSpecies } from "../useRouteSpecies";
import { useRouteVariant } from "../useRouteVariant";
import { TextStack } from "./TextStack";
import { VariantTraitListEntryListItem } from "./VariantTraitListEntryListItem";

export const TraitListDetailCard: FunctionComponent = () => {
  const variant = useRouteVariant();
  if (!variant) {
    throw new Error("Invalid variant");
  }
  const species = useRouteSpecies();
  const community = useRouteCommunity();
  const allTraits = useRouteLoaderData("root.community.species.variant");
  const [showConfirmAddDialog, setShowConfirmAddDialog] = useState(false);
  const [traitListEntryToRemove, setTraitListEntryToRemove] =
    useState<typeof variant["traitListEntries"][number]>();
  const [showConfirmRemoveDialog, setShowConfirmRemoveDialog] = useState(false);
  const [traitToAdd, setTraitToAdd] =
    useState<typeof allTraits["list"][number]>();
  const { submit } = useFetcher();

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
          {allTraits.list.map((trait) => (
            <With value={() => findTraitListEntry(trait.id)} key={trait.id}>
              {(traitListEntry) => (
                <VariantTraitListEntryListItem
                  trait={trait}
                  traitListEntry={traitListEntry}
                  enumValueSettings={variant.enumValueSettings}
                  onEnabledChange={(trait, enabled, traitListEntry) => {
                    if (enabled) {
                      setTraitToAdd(trait);
                      setShowConfirmAddDialog(true);
                    } else {
                      setTraitListEntryToRemove(traitListEntry);
                      setShowConfirmRemoveDialog(true);
                    }
                  }}
                  onRequiredChange={(traitListEntry, required) => {
                    const route = AppRoutes.speciesVariantTraitListEntryDetail(
                      community.id,
                      species.id,
                      variant.id,
                      traitListEntry.id
                    );
                    const formData = { required: required.toString() };
                    submit(formData, {
                      action: route,
                      method: "patch",
                    });
                  }}
                  onEnumValueEnabledChange={(
                    _trait,
                    enumValue,
                    enabled,
                    enumValueSetting
                  ) => {
                    if (enabled) {
                      const route =
                        AppRoutes.speciesVariantTraitListEntryEnumValueSettingList(
                          community.id,
                          species.id,
                          variant.id,
                          traitListEntry!.id
                        );
                      const formData = {
                        enumValueId: enumValue.id,
                      };
                      submit(formData, {
                        action: route,
                        method: "post",
                      });
                    } else {
                      const route =
                        AppRoutes.speciesVariantTraitListEntryEnumValueSettingDetail(
                          community.id,
                          species.id,
                          variant.id,
                          traitListEntry!.id,
                          enumValueSetting!.id
                        );
                      submit(null, { action: route, method: "delete" });
                    }
                  }}
                ></VariantTraitListEntryListItem>
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
                submit(
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
                submit(null, {
                  action: traitListEntryToRemove
                    ? AppRoutes.speciesVariantTraitListEntryDetail(
                        community.id,
                        species.id,
                        variant.id,
                        traitListEntryToRemove.id
                      )
                    : "",
                  method: "delete",
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
