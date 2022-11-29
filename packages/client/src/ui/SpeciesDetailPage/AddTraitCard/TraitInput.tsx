import { TextFieldProps, TextField, MenuItem } from "@mui/material";
import { FC, ReactElement } from "react";
import { CritterTraitValueType } from "../../../generated/graphql";

export interface TraitInputProps {
  name: string;
  type: CritterTraitValueType;
  enumOptions?: string[];
  fieldProps?: TextFieldProps;
}
export const TraitInput: FC<TraitInputProps> = ({
  name,
  type,
  enumOptions,
  fieldProps,
}) => {
  const results: Record<CritterTraitValueType, () => ReactElement> = {
    [CritterTraitValueType.Enum]: () => (
      <TextField {...fieldProps} select label={name}>
        {enumOptions?.map((name, i) => (
          <MenuItem value={name} key={i}>
            {name}
          </MenuItem>
        ))}
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
