import {
  isInvalidArgumentError,
  isRequestPasswordResetReceivedResponse,
} from "@clovercoin/api-client";
import { LoadingButton } from "@mui/lab";
import { Card, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { assertNever } from "../../utils/assertNever";
import { stylesheet } from "../../utils/emotion";
import { useRouteActionData } from "../../utils/loaderDataUtils";
import { AppRoutes } from "../AppRoutes";
import { Link } from "../Link/Link";

export const ForgotPasswordPage: FC = () => {
  const errorOrResult = useRouteActionData<"root.forgotPassword">();

  const [email, setEmail] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      email: "",
    }));
  }, [email]);

  const [fieldErrors, setFieldErrors] = useState(() => ({
    email: "",
  }));

  useEffect(() => {
    if (!errorOrResult || errorOrResult instanceof Response) {
      return;
    }
    if (isRequestPasswordResetReceivedResponse(errorOrResult)) {
      setIsComplete(true);
    } else if (isInvalidArgumentError(errorOrResult)) {
      for (const err of errorOrResult.validationErrors) {
        setFieldErrors((fieldErrors) => ({
          ...fieldErrors,
          [err.field]: err.constraints.map((c) => c.description).join(", "),
        }));
      }
    } else {
      assertNever(errorOrResult);
    }
  }, [errorOrResult]);

  return (
    <Card css={ss.root}>
      <Form action={AppRoutes.forgotPassword()} method="post">
        <Typography variant="h5">Reset Password</Typography>
        <Typography variant="body1" color="text.secondary">
          Forgot your password? Enter the email address associated with your
          account below.
        </Typography>
        <br />
        <Typography variant="body1">
          <Link to={AppRoutes.login()}>Back to login</Link>
        </Typography>
        <br />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          error={Boolean(fieldErrors.email)}
          helperText={fieldErrors.email}
          disabled={isComplete}
          fullWidth
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          css={ss.field}
        />
        {isComplete ? (
          <Typography variant="body1" color="success.main">
            {errorOrResult.message}
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
              !email ||
              Object.values(fieldErrors).some((val) => val)
            }
          >
            Request Reset Email
          </LoadingButton>
        )}
      </Form>
    </Card>
  );
};
ForgotPasswordPage.displayName = "ForgotPasswordPage";

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
