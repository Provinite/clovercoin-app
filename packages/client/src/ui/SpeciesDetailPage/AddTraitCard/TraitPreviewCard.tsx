import { Card, CardHeader, CardContent, FormControl } from "@mui/material";
import { FC, useState } from "react";
import { TraitFormState } from "./TraitForm/TraitFormState";
import { TraitInput } from "./TraitInput";

export const TraitPreviewCard: FC<{ form: TraitFormState }> = ({ form }) => {
  const [previewValue, setPreviewValue] = useState<any>("");
  return (
    <Card elevation={2}>
      <CardHeader
        title="Preview"
        subheader="This is what your new trait will look like when editing a character."
      ></CardHeader>
      <CardContent>
        <FormControl fullWidth>
          <TraitInput
            type={form.valueType}
            name={form.name}
            enumOptions={form.enumValues.map((v) => v.name)}
            fieldProps={{
              value: previewValue,
              onChange: (e) => setPreviewValue(e.target.value),
            }}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};
