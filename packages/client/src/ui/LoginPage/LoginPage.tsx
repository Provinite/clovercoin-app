import { InvalidArgumentError } from "@clovercoin/api-client";
import { LoadingButton } from "@mui/lab";
import { Card, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";
import { stylesheet } from "../../utils/emotion";
import { useRouteActionData } from "../../utils/loaderDataUtils";
import { AppRoutes } from "../AppRoutes";
import { Link } from "../Link/Link";

export function exhaustiveSwitch<
  Values extends string,
  Handlers extends { [key in Values]: (val: key) => any }
>(value: Values, handlers: Handlers) {
  if (Object.prototype.hasOwnProperty.call(handlers, value)) {
    return handlers[value](value);
  }
  throw new Error("Invariant violation: exhaustive switch is not.");
}

export const LoginPage: FC = () => {
  usePageTitle("CloverCoin Species - Login");
  const error = useRouteActionData<"root.login">();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      username: "",
      form: "",
    }));
  }, [username]);

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      password: "",
      form: "",
    }));
  }, [password]);

  type FieldNames = "username" | "password" | "form";
  const [fieldErrors, setFieldErrors] = useState<
    Record<FieldNames, string | undefined | null>
  >(() => ({
    username: null,
    password: null,
    form: null,
  }));

  useEffect(() => {
    if (!error || error instanceof Response) {
      return;
    }
    exhaustiveSwitch(error.__typename, {
      InvalidArgumentError: () => {
        const err = error as InvalidArgumentError;
        for (const { field, constraints } of err.validationErrors) {
          setFieldErrors((fieldErrors) => ({
            ...fieldErrors,
            [field]: constraints.map((c) => c.description).join(", "),
          }));
        }
      },
      LoginFailureResponse: () => {
        setFieldErrors((fieldErrors) => ({
          ...fieldErrors,
          form: "Login failed. Check your username and password.",
        }));
      },
    });
  }, [error]);

  return (
    <Card css={ss.root}>
      <Form action={AppRoutes.login()} method="post">
        <Typography variant="h5">Welcome!</Typography>
        <Typography variant="body1" color="text.secondary">
          Log in with your username and password below to access your
          comnmunity.
        </Typography>
        <br />
        <Typography variant="body1">
          New Here? <Link to={AppRoutes.register()}>Register</Link>
        </Typography>
        <br />
        <Typography variant="body1">
          <Link to={AppRoutes.forgotPassword()}>Forgot your password?</Link>
        </Typography>
        <br />
        <Typography variant="body1">
          Confused? Learn <Link to={AppRoutes.about()}>about the app</Link>
        </Typography>
        {fieldErrors.form ? (
          <Typography color="error.main" variant="body1">
            {fieldErrors.form}
          </Typography>
        ) : (
          <></>
        )}
        <br />
        <TextField
          name="username"
          label="Username"
          type="text"
          required
          error={Boolean(fieldErrors.username)}
          helperText={fieldErrors.username ?? ""}
          fullWidth
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
          css={ss.field}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          error={Boolean(fieldErrors.password)}
          helperText={fieldErrors.password ?? ""}
          fullWidth
          required
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          css={ss.field}
        />
        <LoadingButton
          css={ss.field}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            !username ||
            !password ||
            // if there are errors, disabled
            Object.values(fieldErrors).some((val) => val)
          }
        >
          Login
        </LoadingButton>
      </Form>
    </Card>
  );
};
LoginPage.displayName = "LoginPage";

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
