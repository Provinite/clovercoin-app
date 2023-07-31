import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { AppRoutes } from "../../AppRoutes";
import { TraitInput } from "../../common/TraitInput";
import { useRouteSpecies } from "../useRouteSpecies";

type CritterCreateValues = Record<string, string>;

export interface AddCritterCardProps {}
export const AddCritterCard: FC = () => {
  const fetcher = useFetcher();
  const species = useRouteSpecies();
  const [variant, setVariant] = useState<typeof species["traitLists"][number]>(
    species.traitLists[0]
  );
  const [name, setName] = useState("");
  const [traitValues, setTraitValues] = useState<CritterCreateValues>({});
  const community = useRouteCommunity();
  useEffect(() => {
    const result: CritterCreateValues = {};
    for (const traitListEntry of variant.traitListEntries) {
      result[traitListEntry.id] = traitListEntry.defaultDisplayValue ?? "";
    }
    setTraitValues(traitValues);
  }, [variant]);

  return (
    <Card>
      <CardHeader
        title={`Create A ${species.name}`}
        subheader={`Provide details about a specific critter here to add it to the list.`}
      />
      <CardContent>
        <fetcher.Form
          method="post"
          action={AppRoutes.addCritter(community.id, species.id)}
        >
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
              value={variant.id}
              onChange={(e) =>
                setVariant(
                  species.traitLists.find((tl) => tl.id === e.target.value)!
                )
              }
              helperText="The critter's variant determines what traits and values are available."
            >
              {species.traitLists.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <List>
            {[...variant.traitListEntries]
              /**
               * Display in proper sort order
               */
              .sort((a, b) => a.order - b.order)
              .map((traitListEntry) => (
                <ListItem css={{ paddingLeft: 0 }}>
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
                      value: traitValues[traitListEntry.id] ?? "",
                      onChange: ({ target: { value } }) => {
                        setTraitValues((traitValues) => ({
                          ...traitValues,
                          [traitListEntry.id]: value,
                        }));
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
      </CardContent>
    </Card>
  );
};

export const ConnectedAddCritterCard = AddCritterCard;
