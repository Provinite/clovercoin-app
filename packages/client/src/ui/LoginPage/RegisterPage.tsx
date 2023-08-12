import {
  isDuplicateError,
  isInvalidArgumentError,
} from "@clovercoin/api-client";
import { LoadingButton } from "@mui/lab";
import { Card, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Form, useFetcher, useSearchParams } from "react-router-dom";
import { stylesheet } from "../../utils/emotion";
import { useRouteActionData } from "../../utils/loaderDataUtils";
import { AppRoutes } from "../AppRoutes";
import { Link } from "../Link/Link";

export const RegisterPage: FC = () => {
  const fetcher = useFetcher();
  const error = useRouteActionData<"root.register">();
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    inviteCodeId: "",
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [inviteCodeId, setInviteCodeId] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setInviteCodeId(code);
    }
  }, [searchParams.get("code")]);

  useEffect(() => {
    if (!error) return;
    if (isInvalidArgumentError(error)) {
      const newFieldErrors = { email: "", username: "", password: "" };
      for (const err of error.validationErrors) {
        newFieldErrors[err.field as "email" | "username" | "password"] =
          err.constraints.map(({ description }) => description).join(", ");
      }
      setFieldErrors((fieldErrors) => ({ ...fieldErrors, ...newFieldErrors }));
    } else if (isDuplicateError(error)) {
      for (const key of error.duplicateKeys) {
        if (key in fieldErrors) {
          setFieldErrors((fieldErrors) => ({
            ...fieldErrors,
            [key]: `This ${key} is already in use.`,
          }));
        }
      }
    }
  }, [error]);

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      repeatPassword:
        password === repeatPassword ? "" : "Passwords do not match",
    }));
  }, [password, repeatPassword]);

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      email: "",
    }));
  }, [email]);

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      inviteCodeId: "",
    }));
  }, [inviteCodeId]);

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      username: "",
    }));
  }, [username]);

  useEffect(() => {
    setFieldErrors((fieldErrors) => ({
      ...fieldErrors,
      password: "",
    }));
  }, [password]);

  return (
    <Card css={ss.root}>
      <Form action={AppRoutes.register()} method="post">
        <Typography variant="h5">Hello there!</Typography>
        <Typography variant="body1" color="text.secondary">
          Sign up to get started managing your species!
        </Typography>
        <br />
        <Typography variant="body1">
          <Link to={AppRoutes.login()}>Back to login</Link>
        </Typography>
        <br />
        <TextField
          label="Email"
          type="email"
          name="email"
          fullWidth
          required
          css={ss.field}
          error={Boolean(fieldErrors.email)}
          helperText={fieldErrors.email}
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <TextField
          label="Username"
          type="text"
          name="username"
          fullWidth
          required
          css={ss.field}
          error={Boolean(fieldErrors.username)}
          helperText={fieldErrors.username}
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          required
          css={ss.field}
          error={Boolean(fieldErrors.password)}
          helperText={fieldErrors.password}
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <TextField
          label="Repeat Password"
          type="password"
          name="repeatPassword"
          fullWidth
          required
          css={ss.field}
          error={Boolean(fieldErrors.repeatPassword)}
          helperText={fieldErrors.repeatPassword}
          onChange={({ target: { value } }) => setRepeatPassword(value)}
          value={repeatPassword}
        />
        <TextField
          label="Invite Code"
          type="string"
          name="inviteCodeId"
          fullWidth
          required
          css={ss.field}
          error={Boolean(fieldErrors.inviteCodeId)}
          helperText={fieldErrors.inviteCodeId}
          onChange={({ target: { value } }) => setInviteCodeId(value)}
          value={inviteCodeId}
        />
        <LoadingButton
          css={ss.field}
          fullWidth
          type="submit"
          loading={fetcher.state !== "idle"}
          variant="contained"
          color="primary"
          disabled={Object.values(fieldErrors).some((e) => e)}
        >
          Register
        </LoadingButton>
      </Form>
    </Card>
  );
};
RegisterPage.displayName = "LoginPage";

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
