import {
  EnumValue,
  EnumValueSetting,
  Species,
  Trait,
  TraitList,
  TraitListEntry,
} from "@clovercoin/api-client";
import { LoadingButton } from "@mui/lab";
import {
  Stack,
  TextField,
  MenuItem,
  List,
  ListItem,
  CardActions,
} from "@mui/material";
import { FC } from "react";
import { FetcherWithComponents } from "react-router-dom";
import { TraitInput } from "../common/TraitInput";
import { CritterFormState, CritterFormStateDispatch } from "./useCritterForm";

export type CritterFormStateVariant = Pick<TraitList, "id" | "name"> & {
  enumValueSettings: Array<
    Pick<EnumValueSetting, "id" | "enumValueId" | "traitListId">
  >;
  traitListEntries: Array<
    Pick<TraitListEntry, "id" | "order" | "required"> & {
      trait: Pick<Trait, "id" | "name" | "valueType"> & {
        enumValues: Array<Pick<EnumValue, "id" | "name">>;
      };
    }
  >;
};

export interface CritterFormProps {
  species: Pick<Species, "name" | "id"> & {
    traitLists: CritterFormStateVariant[];
  };
  fetcher: FetcherWithComponents<any>;
  value: CritterFormState;
  dispatch: CritterFormStateDispatch;
  method: "post" | "put";
  action: string;
}
export const CritterForm: FC<CritterFormProps> = ({
  species,
  fetcher,
  value,
  method,
  action,
  dispatch,
}) => {
  const makeHandler =
    <K extends keyof CritterFormState>(key: K) =>
    (val: CritterFormState[K]) =>
      dispatch({
        type: "set",
        partial: { [key]: val },
      });

  const setName = makeHandler("name");
  const setVariantId = makeHandler("variantId");

  const { name, variantId, traitValues } = value;
  const variant = species.traitLists.find(
    (traitList) => traitList.id === variantId
  );
  return (
    <fetcher.Form method={method} action={action}>
      <Stack spacing={2} direction="row">
        <TextField
          label="Name"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          helperText="This can be changed at any time"
        >
          {species.traitLists.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Variant"
          value={variant?.id || ""}
          onChange={(e) =>
            setVariantId(
              species.traitLists.find((tl) => tl.id === e.target.value)!.id
            )
          }
          helperText="The critter's variant determines what traits and values are available."
        >
          <MenuItem value={""}>Choose a variant</MenuItem>
          {species.traitLists.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <List>
        {variant &&
          [...variant.traitListEntries]
            /**
             * Display in proper sort order
             */
            .sort((a, b) => a.order - b.order)
            .map((traitListEntry) => (
              <ListItem css={{ paddingLeft: 0 }} key={traitListEntry.id}>
                <TraitInput
                  type={traitListEntry.trait.valueType}
                  name={traitListEntry.trait.name}
                  enumOptions={traitListEntry.trait.enumValues.map(
                    (enumValue) => ({
                      label: enumValue.name,
                      value: enumValue.id,
                      /**
                       * Respect enum value x variant configurations by disabling
                       * disallowed options.
                       *
                       * PERF: This won't be performant with large lists of enum
                       * value settings or enum values.
                       */
                      disabled: !variant.enumValueSettings.some(
                        ({ enumValueId }) => enumValueId === enumValue.id
                      ),
                    })
                  )}
                  fieldProps={{
                    /**
                     * Respect requiredness
                     */
                    required: traitListEntry.required,
                    value: traitValues[traitListEntry.trait.id] ?? "",
                    onChange: ({ target: { value } }) => {
                      dispatch({
                        type: "setTraitValue",
                        traitId: traitListEntry.trait.id,
                        value,
                      });
                    },
                    fullWidth: true,
                  }}
                />
              </ListItem>
            ))}
      </List>
      <CardActions css={(theme) => ({ padding: theme.spacing(2) })}>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={fetcher.state !== "idle"}
        >
          Create
        </LoadingButton>
      </CardActions>
    </fetcher.Form>
  );
};
