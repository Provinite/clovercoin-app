import {
  CritterTraitValueType,
  Trait,
  TraitListEntry,
} from "@clovercoin/api-client";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import {
  Typography,
  Switch,
  Grid,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { stylesheet } from "../../../utils/emotion";
import { GridRow } from "../../lib/GridRow";
import { TextStack } from "./TextStack";

export interface VariantTraitListEntryListItemProps<
  TraitPartial,
  TraitListEntryPartial
> {
  trait: TraitPartial;
  traitListEntry?: TraitListEntryPartial;
  onRequiredChange: (
    traitListEntry: TraitListEntryPartial,
    required: boolean
  ) => void;
  onEnabledChange: (
    trait: TraitPartial,
    enabled: boolean,
    traitListEntry?: TraitListEntryPartial
  ) => void;
}

export const VariantTraitListEntryListItem = <
  TraitListPartial extends Pick<TraitListEntry, "order" | "required">,
  TraitPartial extends Pick<Trait, "id" | "name" | "valueType"> & {
    enumValues: Array<Pick<Trait["enumValues"][number], "id" | "name">>;
  }
>({
  trait,
  traitListEntry,
  onRequiredChange,
  onEnabledChange,
}: VariantTraitListEntryListItemProps<TraitPartial, TraitListPartial>) => {
  const [expanded, setExpanded] = useState(false);
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (!traitListEntry || trait.valueType !== CritterTraitValueType.Enum) {
      setExpanded(false);
    }
  }, [traitListEntry, trait]);
  return (
    <>
      <Grid container item xs={12} padding={0} margin={0}>
        <GridRow xs={[3, 2, 2, 2, 3]} divider>
          {/* Name & Type */}
          <TextStack
            css={ss.gridItem}
            primary={trait.name}
            secondary={trait.valueType}
          />
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
          {/* Expand  */}
          <div css={ss.gridItem}>
            <Box>
              {trait.valueType === CritterTraitValueType.Enum && (
                <IconButton
                  disabled={!traitListEntry}
                  onClick={() => setExpanded((e) => !e)}
                >
                  {expanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
            </Box>
          </div>
        </GridRow>
      </Grid>
      {trait.valueType === CritterTraitValueType.Enum && (
        <Grid item xs={12} css={(theme) => ({ marginLeft: theme.spacing(4) })}>
          <Collapse in={expanded}>
            <Grid container>
              <GridRow xs={[2, 10]} divider={false}>
                <Typography padding={1} variant="body1" color="text.secondary">
                  Allowed
                </Typography>
                <Typography padding={1} variant="body1" color="text.secondary">
                  Option
                </Typography>
              </GridRow>
              {trait.enumValues.map((enumValue, i) => (
                <GridRow
                  xs={[2, 10]}
                  divider={i === trait.enumValues.length - 1}
                >
                  <Box css={(theme) => ({ paddingLeft: theme.spacing(2) })}>
                    <Switch
                      disabled={!traitListEntry}
                      checked={enabledMap[enumValue.id] === true}
                      onChange={() =>
                        setEnabledMap((em) => ({
                          ...em,
                          [enumValue.id]: !em[enumValue.id],
                        }))
                      }
                    />
                  </Box>
                  <Box
                    css={[
                      ss.gridItem,
                      (theme) => ({ paddingLeft: theme.spacing(2) }),
                    ]}
                  >
                    <Typography
                      color={
                        enabledMap[enumValue.id] ? "inherit" : "text.secondary"
                      }
                    >
                      {enumValue.name}
                    </Typography>
                  </Box>
                </GridRow>
              ))}
            </Grid>
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
  gridItem: (theme) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),
});
