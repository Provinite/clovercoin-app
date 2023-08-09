import { LoadingButton } from "@mui/lab";
import { Card, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { useFetcher } from "react-router-dom";
import { stylesheet } from "../../utils/emotion";
import { AppRoutes } from "../AppRoutes";
import { Link } from "../Link/Link";

export const LoginPage: FC = () => {
  const fetcher = useFetcher();
  return (
    <Card css={ss.root}>
      <fetcher.Form>
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
        <TextField label="Username" type="text" fullWidth css={ss.field} />
        <TextField label="Password" type="password" fullWidth css={ss.field} />
        <LoadingButton
          css={ss.field}
          fullWidth
          type="submit"
          loading={fetcher.state !== "idle"}
          variant="contained"
          color="primary"
        >
          Login
        </LoadingButton>
      </fetcher.Form>
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
