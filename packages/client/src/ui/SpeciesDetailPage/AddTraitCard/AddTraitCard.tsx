import { FC, Fragment, FunctionComponent, ReactElement, useState } from "react";
import { useFetcher } from "react-router-dom";
import { CritterTraitValueType } from "../../../generated/graphql";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";

export const AddTraitCard: FunctionComponent = () => {
  const [name, setName] = useState("");
  const [dataType, setDataType] = useState<CritterTraitValueType>(
    CritterTraitValueType.String
  );
  const [enumValues, setEnumValues] = useState<string[]>([]);
  const fetcher = useFetcher();

  const [previewValue, setPreviewValue] = useState<any>("");
  const sizes = {
    xs: 6,
    lg: 4,
    xl: 3,
  };
  return (
    <>
      <CardHeader
        title="Add Trait"
        subheader="Create traits here, and add them to trait lists later."
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item {...sizes}>
            <Card elevation={2}>
              <CardHeader title="Options" subheader="Set up your trait" />
              <CardContent>
                <FormControl
                  component={fetcher.Form}
                  action="../"
                  method="post"
                  fullWidth
                >
                  <TextField
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                  <br />
                  <TextField
                    name="dataType"
                    value={dataType}
                    onChange={(e) =>
                      setDataType(e.target.value as CritterTraitValueType)
                    }
                    select
                    label="Type"
                  >
                    <MenuItem value={CritterTraitValueType.String}>
                      Text
                    </MenuItem>
                    <MenuItem value={CritterTraitValueType.Timestamp}>
                      Date
                    </MenuItem>
                    <MenuItem value={CritterTraitValueType.Integer}>
                      Number
                    </MenuItem>
                    <MenuItem value={CritterTraitValueType.Enum}>
                      Dropdown
                    </MenuItem>
                  </TextField>
                  <br />
                  {dataType === CritterTraitValueType.Enum && (
                    <>
                      <Typography variant="h6">Dropdown Options</Typography>
                      <Typography variant="body1" color="text.secondary">
                        Options for this trait
                      </Typography>
                      <br />
                      {[...enumValues, ""].map((ev, i) => (
                        <Fragment key={i}>
                          <TextField
                            label={`Dropdown Option ${i}`}
                            type="string"
                            value={ev}
                            name="enumValues"
                            onChange={(e) => {
                              setEnumValues((enumValues) => [
                                ...enumValues.slice(0, i),
                                e.target.value,
                                ...enumValues.slice(i + 1),
                              ]);
                            }}
                            onBlur={(e) => {
                              if (e.target.value === "") {
                                setEnumValues((enumValues) => [
                                  ...enumValues.slice(0, i),
                                  ...enumValues.slice(i + 1),
                                ]);
                              }
                            }}
                          />
                          <br />
                        </Fragment>
                      ))}
                    </>
                  )}
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid item {...sizes}>
            <Card elevation={2}>
              <CardHeader
                title="Preview"
                subheader="This is what your new trait will look like when editing a character."
              ></CardHeader>
              <CardContent>
                <FormControl fullWidth>
                  <TraitInput
                    type={dataType}
                    name={name}
                    enumOptions={enumValues}
                    fieldProps={{
                      value: previewValue,
                      onChange: (e) => setPreviewValue(e.target.value),
                    }}
                  />
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

interface TraitInputProps {
  name: string;
  type: CritterTraitValueType;
  enumOptions?: string[];
  fieldProps?: TextFieldProps;
}
const TraitInput: FC<TraitInputProps> = ({
  name,
  type,
  enumOptions,
  fieldProps,
}) => {
  const results: Record<CritterTraitValueType, () => ReactElement> = {
    [CritterTraitValueType.Enum]: () => (
      <TextField {...fieldProps} select label={name}>
        {enumOptions?.map((name) => (
          <MenuItem value={name} key={name}>
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
