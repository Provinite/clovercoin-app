import { useQuery } from "@apollo/client";
import {
  GetInviteCodeListDocument,
  GetInviteCodeListQuery,
  GetInviteCodeListQueryVariables,
  isDuplicateError,
  isInvalidArgumentError,
} from "@clovercoin/api-client";
import { LoadingButton } from "@mui/lab";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { ActionData, RouteType } from "../../routes";
import { AppRoutes } from "../AppRoutes";
import { GridRow } from "../lib/GridRow";

export interface InviteCodeListProps {}
export const InviteCodeList: FC<InviteCodeListProps> = () => {
  const { data } = useQuery<
    GetInviteCodeListQuery,
    GetInviteCodeListQueryVariables
  >(GetInviteCodeListDocument);

  const fetcher = useFetcher<ActionData<RouteType<"admin.inviteCodes">>>();
  const [code, setCode] = useState("");
  const [maxClaims, setMaxClaims] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<
    Record<"id" | "maxClaims", string>
  >({
    id: "",
    maxClaims: "",
  });

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
  if (!data) {
    return <></>;
  }
  return (
    <Grid container>
      <Grid
        item
        xs={3}
        component={Typography}
        variant="body1"
        color="text.secondary"
        p={1}
      >
        Invite Code
      </Grid>
      <Grid
        item
        xs={3}
        component={Typography}
        variant="body1"
        color="text.secondary"
        p={1}
      >
        Creator
      </Grid>
      <Grid
        item
        xs={3}
        component={Typography}
        variant="body1"
        color="text.secondary"
        p={1}
      >
        Times Used
      </Grid>
      <Grid
        item
        xs={3}
        component={Typography}
        variant="body1"
        color="text.secondary"
        p={1}
      >
        Total Uses
      </Grid>
      {data.inviteCodes.list.map((inviteCode) => (
        <GridRow key={inviteCode.id} xs={[3, 3, 3, 3]}>
          <Typography variant="body1" p={2}>
            {inviteCode.id}
          </Typography>
          <Typography variant="body1" p={2}>
            {inviteCode.creator.displayName}
          </Typography>
          <Typography variant="body1" p={2}>
            {inviteCode.claimCount}
          </Typography>
          <Typography variant="body1" p={2}>
            {inviteCode.maxClaims}
          </Typography>
        </GridRow>
      ))}
      <fetcher.Form
        method="post"
        action={AppRoutes.inviteCodeList()}
        css={{ display: "contents" }}
      >
        <Grid item xs={5} p={2}>
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
        <Grid item xs={5} p={2}>
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
        <Grid
          item
          xs={2}
          component={Stack}
          css={{ flexDirection: "column" }}
          justifyContent="center"
          alignContent="center"
          p={2}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={
              Object.values(fieldErrors).some((e) => e) || !maxClaims || !code
            }
          >
            Add One
          </LoadingButton>
        </Grid>
      </fetcher.Form>
    </Grid>
  );
};
