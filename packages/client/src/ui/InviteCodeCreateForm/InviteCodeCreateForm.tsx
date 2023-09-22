import {
  isDuplicateError,
  isInvalidArgumentError,
} from "@clovercoin/api-client";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField, MenuItem, Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { ActionData, RouteType } from "../../routes";
import { useRouteCommunity } from "../../useRouteCommunity";
import { stylesheet } from "../../utils/emotion";
import { AppRoutes } from "../AppRoutes";

export interface InviteCodeCreateFormProps {}
export const InviteCodeCreateForm: FC<InviteCodeCreateFormProps> = () => {
  const community = useRouteCommunity();

  const fetcher = useFetcher<ActionData<RouteType<"admin.inviteCodes">>>();
  const [code, setCode] = useState("");
  const [maxClaims, setMaxClaims] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({
    id: "",
    maxClaims: "",
    roleId: "",
  });
  const [roleId, setRoleId] = useState("");

  useEffect(() => {
    if (isDuplicateError(fetcher.data)) {
      for (const key of fetcher.data.duplicateKeys) {
        setFieldErrors((fieldErrors) => ({
          ...fieldErrors,
          [key]: "Already in use",
        }));
      }
    } else if (isInvalidArgumentError(fetcher.data)) {
      for (const { field, constraints } of fetcher.data.validationErrors) {
        setFieldErrors((fieldErrors) => ({
          ...fieldErrors,
          [field]: constraints.map((c) => c.description).join(", "),
        }));
      }
    }
  }, [fetcher.data]);

  const [codeWidth, maxClaimsWidth, roleWidth, buttonWidth] = community
    ? [3, 3, 3, 3]
    : [5, 5, 0, 2];

  return (
    <fetcher.Form
      method="post"
      action={AppRoutes.inviteCodeList()}
      css={{ display: "contents" }}
    >
      <Grid item xs={codeWidth} p={2}>
        <TextField
          type="string"
          name="id"
          value={code}
          onChange={({ target: { value } }) => {
            setCode(value);
            setFieldErrors((fieldErrors) => ({ ...fieldErrors, id: "" }));
          }}
          required
          error={!!fieldErrors.id}
          helperText={fieldErrors.id || "The custom invite code"}
          label="Code"
          fullWidth
        />
      </Grid>
      <Grid item xs={maxClaimsWidth} p={2}>
        <TextField
          type="number"
          name="maxClaims"
          label="Total Uses"
          required
          value={maxClaims}
          onChange={({ target: { value } }) => {
            setMaxClaims(Number(value));
            setFieldErrors((fieldErrors) => ({
              ...fieldErrors,
              maxClaims: "",
            }));
          }}
          error={!!fieldErrors.maxClaims}
          helperText={
            fieldErrors.maxClaims || "How many times this code can be used"
          }
          fullWidth
        />
      </Grid>
      {community && (
        <Grid item xs={roleWidth} p={2}>
          <TextField
            label="Role"
            value={roleId}
            name="roleId"
            onChange={({ target: { value } }) => {
              setRoleId(value);
              setFieldErrors((fieldErrors) => ({
                ...fieldErrors,
                roleId: "",
              }));
            }}
            select
            fullWidth
            helperText={
              fieldErrors.roleId ||
              "Users that use this code will be granted this role"
            }
            error={!!fieldErrors.maxClaims}
            required
          >
            {community.roles.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
      <Grid item xs={buttonWidth} css={ss.buttonGridItem}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={fetcher.state === "loading"}
          disabled={
            Object.values(fieldErrors).some((e) => e) ||
            !maxClaims ||
            !code ||
            (!roleId && !!community) ||
            fetcher.state === "loading"
          }
        >
          Add One
        </LoadingButton>
        <Box css={ss.spacer}>&nbsp;</Box>
      </Grid>
    </fetcher.Form>
  );
};

const ss = stylesheet({
  spacer: {
    width: "100%",
    height: "20px",
  },
  buttonGridItem: (theme) => ({
    flexDirection: "column",
    display: "flex",
    padding: theme.spacing(1),
    justifyContent: "center",
  }),
});
