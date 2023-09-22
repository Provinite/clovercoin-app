import {
  isInvalidArgumentError,
  isResetPasswordSuccessResponse,
} from "@clovercoin/api-client";
import { LoadingButton } from "@mui/lab";
import { Card, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";
import { assertNever } from "../../utils/assertNever";
import { stylesheet } from "../../utils/emotion";
import { useRouteActionData } from "../../utils/loaderDataUtils";
import { AppRoutes } from "../AppRoutes";
import { Link } from "../Link/Link";

export const ResetPasswordPage: FC = () => {
  usePageTitle("CloverCoin Species - Reset Password");
  const [searchParams] = useSearchParams();

  const errorOrResult = useRouteActionData<"root.resetPassword">();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [token] = useState(searchParams.get("code") ?? "");

  const [isComplete, setIsComplete] = useState(false);

  const [fieldErrors, setFieldErrors] = useState(() => ({
    password: "",
    repeatPassword: "",
    token: token
      ? ""
      : "Missing reset code. Please follow the link in your email.",
  }));

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      password: "",
    }));
  }, [password]);

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      repeatPassword:
        password === repeatPassword ? "" : "Passwords do not match",
    }));
  }, [repeatPassword]);

  useEffect(() => {
    if (!errorOrResult || errorOrResult instanceof Response) {
      return;
    }
    if (isInvalidArgumentError(errorOrResult)) {
      for (const err of errorOrResult.validationErrors) {
        setFieldErrors((fieldErrors) => ({
          ...fieldErrors,
          [err.field]: err.constraints.map((c) => c.description).join(", "),
        }));
      }
    } else if (isResetPasswordSuccessResponse(errorOrResult)) {
      setIsComplete(true);
    } else {
      assertNever(errorOrResult);
    }
  }, [errorOrResult]);

  return (
    <Card css={ss.root}>
      <Form action={AppRoutes.resetPassword()} method="post">
        <Typography variant="h5">Reset Password</Typography>
        <Typography variant="body1" color="text.secondary"></Typography>
        <br />
        <Typography variant="body1">
          <Link to={AppRoutes.login()}>Back to login</Link>
        </Typography>
        <br />
        <TextField
          name="password"
          label="Password"
          type="password"
          required
          error={Boolean(fieldErrors.password)}
          helperText={fieldErrors.password}
          disabled={isComplete}
          fullWidth
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          css={ss.field}
        />
        <TextField
          label="Repeat Password"
          type="password"
          required
          error={Boolean(fieldErrors.repeatPassword)}
          helperText={fieldErrors.repeatPassword}
          disabled={isComplete}
          fullWidth
          value={repeatPassword}
          onChange={({ target: { value } }) => setRepeatPassword(value)}
          css={ss.field}
        />
        <TextField
          type="text"
          inputProps={{ readOnly: true }}
          value={token}
          disabled={isComplete}
          fullWidth
          required
          label="Reset Code"
          name="token"
          error={Boolean(fieldErrors.token)}
          helperText={fieldErrors.token || ""}
          css={ss.field}
        />
        {isComplete ? (
          <Typography variant="body1" color="success.main">
            All set. <Link to={AppRoutes.login()}>Return to login</Link>
          </Typography>
        ) : (
          <LoadingButton
            css={ss.field}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              isComplete ||
              !password ||
              !repeatPassword ||
              !token ||
              Object.values(fieldErrors).some((val) => val)
            }
          >
            Reset Password
          </LoadingButton>
        )}
      </Form>
    </Card>
  );
};
ResetPasswordPage.displayName = "ResetPasswordPage";

const ss = stylesheet({
  root: (theme) => ({
    alignSelf: "center",
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    width: "400px",
  }),
  field: (theme) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }),
});
