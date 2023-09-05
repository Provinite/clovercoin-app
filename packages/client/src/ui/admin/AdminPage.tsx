import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { AppRoutes } from "../AppRoutes";
import { HeaderBar, HeaderBarSpacer } from "../HeaderBar/HeaderBar";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { SideNav } from "../SideNav/SideNav";
import SpaIcon from "@mui/icons-material/Spa";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useFetcher } from "react-router-dom";
import { ActionData, RouteType } from "../../routes";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "../Link/Link";
import { isBaseError } from "@clovercoin/api-client";
import { UserList } from "./UserList";
import { InviteCodeList } from "../InviteCodeList/InviteCodeList";
import { useSnackbar } from "../SequentialSnackbar/SequentialSnackbarContext";

export interface AdminPageProps {}
export const AdminPage: FunctionComponent<AdminPageProps> = () => {
  const [name, setName] = useState("");
  const headerBarProps = useHeaderBarProps();
  const fetcher = useFetcher<ActionData<RouteType<"root.community-list">>>();
  const snackbarQueue = useSnackbar();
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (isBaseError(fetcher.data)) {
        snackbarQueue.appendSimpleError(
          `Error creating community: ${fetcher.data.message}`
        );
        return;
      }
      const { name, id } = fetcher.data;
      snackbarQueue.append({
        children: (
          <Alert
            variant="filled"
            onClose={snackbarQueue.close}
            severity="success"
            css={{ width: "100%" }}
            action={
              <Link to={AppRoutes.speciesList(id)}>
                <Button
                  variant="text"
                  size="small"
                  css={(theme) => ({ marginRight: theme.spacing(1) })}
                >
                  View
                </Button>
                <IconButton size="small" onClick={snackbarQueue.close}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Link>
            }
          >
            Created community {name}
          </Alert>
        ),
      });
    }
  }, [fetcher.state]);
  return (
    <>
      <HeaderBar {...headerBarProps} title="Site Administration" />
      <Stack direction="row">
        <SideNav
          navItems={[
            {
              to: AppRoutes.communityList(),
              children: "Communities",
              icon: <SpaIcon />,
            },
            {
              to: AppRoutes.admin(),
              children: "Site Administration",
              icon: <AdminPanelSettingsIcon />,
            },
          ]}
        />
        <Stack flexGrow={1}>
          <HeaderBarSpacer />
          <Grid container rowSpacing={2} padding={2}>
            <Grid item xs={12}>
              <Card elevation={1}>
                <CardHeader title="Site Administration Actions" />
                <CardContent>
                  Perform various high-level administrative operations here.
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <fetcher.Form
                method="post"
                action={AppRoutes.communityList()}
                css={{ display: "contents" }}
              >
                <Card elevation={1}>
                  <CardHeader title="Create a Community" />
                  <CardContent>
                    <TextField
                      name="name"
                      label="Community Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CardContent>
                  <CardActions css={(theme) => ({ padding: theme.spacing(2) })}>
                    <Button variant="contained" type="submit">
                      Create
                    </Button>
                  </CardActions>
                </Card>
              </fetcher.Form>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Users" subheader="Just a list of users" />
                <CardContent>
                  <UserList />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Invite Codes" />
                <CardContent>
                  <InviteCodeList />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};
