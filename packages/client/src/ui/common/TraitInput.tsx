import { TextFieldProps, TextField, MenuItem } from "@mui/material";
import { FC, ReactElement } from "react";
import { CritterTraitValueType } from "@clovercoin/api-client";

export interface TraitInputProps {
  name: string;
  type: CritterTraitValueType;
  enumOptions?: string[] | TraitEnumOption[];
  fieldProps?: TextFieldProps;
}

export interface TraitEnumOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export const TraitInput: FC<TraitInputProps> = ({
  name,
  type,
  enumOptions,
  fieldProps,
}) => {
  console.log({ enumOptions });
  const results: Record<CritterTraitValueType, () => ReactElement> = {
    [CritterTraitValueType.Enum]: () => (
      <TextField {...fieldProps} select label={name}>
        {enumOptions?.map((config, i) => {
          if (typeof config === "string") {
            config = {
              label: config,
              value: config,
              disabled: false,
            };
          }
          return (
            <MenuItem
              disabled={config.disabled ?? false}
              value={config.value}
              key={i}
            >
              {config.label}
            </MenuItem>
          );
        })}
      </TextField>
    ),
    [CritterTraitValueType.Integer]: () => (
      <TextField {...fieldProps} label={name} type="number" />
    ),
    [CritterTraitValueType.String]: () => (
      <TextField {...fieldProps} label={name} />
    ),
    [CritterTraitValueType.Timestamp]: () => (
      <TextField {...fieldProps} label={name} />
    ),
  };

  return results[type]();
};
