import {
  CritterTraitValueType,
  EnumValueSetting,
  Trait,
  TraitListEntry,
} from "@clovercoin/api-client";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRight from "@mui/icons-material/ChevronRight";

import {
  Typography,
  Switch,
  Grid,
  Collapse,
  IconButton,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { stylesheet } from "../../../utils/emotion";
import { GridRow } from "../../lib/GridRow";
import { TextStack } from "./TextStack";
import { useRouteSpeciesOrFail } from "../useRouteSpecies";
import { useRouteVariant } from "../useRouteVariant";

type MinTrait = Pick<Trait, "id" | "name" | "valueType"> & {
  enumValues: Array<Pick<Trait["enumValues"][number], "id" | "name">>;
};

type MinTraitListEntry = Pick<TraitListEntry, "order" | "required">;
type MinEnumValueSetting = Pick<EnumValueSetting, "id" | "enumValueId">;

export interface VariantTraitListEntryListItemProps<
  TraitPartial extends MinTrait,
  TraitListEntryPartial extends MinTraitListEntry,
  EnumValueSettingPartial extends MinEnumValueSetting
> {
  trait: TraitPartial;
  traitListEntry?: TraitListEntryPartial;
  enumValueSettings: Array<EnumValueSettingPartial>;
  onRequiredChange: (
    traitListEntry: TraitListEntryPartial,
    required: boolean
  ) => void;
  onEnabledChange: (
    trait: TraitPartial,
    enabled: boolean,
    traitListEntry?: TraitListEntryPartial
  ) => void;
  onEnumValueEnabledChange: (
    trait: TraitPartial,
    enumValue: TraitPartial["enumValues"][number],
    enabled: boolean,
    enumValueSetting?: EnumValueSettingPartial
  ) => void;
}

export const VariantTraitListEntryListItem = <
  TraitListEntryPartial extends MinTraitListEntry,
  TraitPartial extends MinTrait,
  EnumValueSettingPartial extends MinEnumValueSetting
>({
  trait,
  traitListEntry,
  enumValueSettings,
  onRequiredChange,
  onEnabledChange,
  onEnumValueEnabledChange,
}: VariantTraitListEntryListItemProps<
  TraitPartial,
  TraitListEntryPartial,
  EnumValueSettingPartial
>) => {
  const [expanded, setExpanded] = useState(false);
  const [renderCollapse, setRenderCollapse] = useState(false);
  const species = useRouteSpeciesOrFail();
  const variant = useRouteVariant();
  useEffect(() => {
    if (!traitListEntry || trait.valueType !== CritterTraitValueType.Enum) {
      setExpanded(false);
    }
  }, [traitListEntry, trait]);
  return (
    <>
      <Grid container item xs={12} padding={0} margin={0}>
        <GridRow xs={[3, 2, 2, 2, 3]} divider={!expanded}>
          {/* Name & Type */}
          <div css={ss.nameCell}>
            {(trait.valueType === CritterTraitValueType.Enum && (
              <IconButton
                disabled={!traitListEntry}
                onClick={() => {
                  setRenderCollapse(true);
                  setExpanded((e) => !e);
                }}
              >
                {expanded ? <ExpandMore /> : <ChevronRight />}
              </IconButton>
            )) || <div css={{ width: 40, height: 40 }}> </div>}
            <TextStack
              css={(theme) => ({ paddingLeft: theme.spacing(1) })}
              primary={trait.name}
              secondary={trait.valueType}
            />
          </div>
          {/* Order */}
          <div css={ss.gridItem}>
            <Typography variant="body1">
              {traitListEntry?.order ?? ""}
            </Typography>
          </div>
          {/* Required */}
          <div css={ss.gridItem}>
            <Switch
              disabled={!traitListEntry}
              checked={traitListEntry?.required ?? false}
              onChange={() => {
                if (!traitListEntry) {
                  return;
                }
                onRequiredChange(traitListEntry, !traitListEntry!.required);
              }}
            />
          </div>
          {/* Enabled */}
          <div css={ss.gridItem}>
            <Switch
              color="success"
              checked={Boolean(traitListEntry)}
              onChange={() => {
                onEnabledChange(trait, !traitListEntry, traitListEntry);
              }}
            />
          </div>
          <></>
        </GridRow>
      </Grid>
      {trait.valueType === CritterTraitValueType.Enum && (
        <Grid item xs={12}>
          <Collapse in={expanded} onExited={() => setRenderCollapse(false)}>
            {renderCollapse && (
              <>
                <Box css={ss.collapse}>
                  <TextStack
                    css={ss.helperText}
                    primary="Allowed Trait Values"
                    secondary={`Control what values a ${variant?.name ?? ""} ${
                      species.name
                    } can use here.`}
                  />
                  <Grid container spacing={4}>
                    {trait.enumValues.map((enumValue) => {
                      const enumValueSetting = enumValueSettings?.find(
                        ({ enumValueId }) => enumValue.id === enumValueId
                      );
                      const valueEnabled = Boolean(enumValueSetting);

                      return (
                        <Grid item xs={"auto"}>
                          <Stack direction="row" alignItems="center">
                            <Box
                              css={(theme) => ({
                                paddingLeft: theme.spacing(1),
                              })}
                            >
                              <Switch
                                disabled={!traitListEntry}
                                checked={valueEnabled}
                                onChange={() => {
                                  onEnumValueEnabledChange(
                                    trait,
                                    enumValue,
                                    !valueEnabled,
                                    enumValueSetting
                                  );
                                }}
                              />
                            </Box>
                            <Box
                              css={[
                                (theme) => ({ paddingLeft: theme.spacing(1) }),
                              ]}
                            >
                              <Typography
                                color={
                                  valueEnabled ? "inherit" : "text.secondary"
                                }
                              >
                                {enumValue.name}
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
                <Divider />
              </>
            )}
          </Collapse>
        </Grid>
      )}
    </>
  );
};

const ss = stylesheet({
  header: (theme) => ({
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }),
  collapse: (theme) => ({
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(8),
  }),
  gridItem: (theme) => ({
    padding: theme.spacing(2),
  }),
  nameCell: (theme) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: theme.spacing(2),
  }),
  helperText: (theme) => ({
    paddingBottom: theme.spacing(2),
  }),
});
