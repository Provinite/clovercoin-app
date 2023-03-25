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
  Toolbar,
} from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { AppRoutes } from "../AppRoutes";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { SideNav } from "../SideNav/SideNav";
import SpaIcon from "@mui/icons-material/Spa";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useFetcher } from "react-router-dom";
import {
  SequentialSnackbar,
  useSnackbarQueue,
} from "../SequentialSnackbar/SequentialSnackbar";
import { ActionData, RouteType } from "../../routes";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "../Link/Link";
import { isBaseError } from "@clovercoin/api-client";

export interface AdminPageProps {}
export const AdminPage: FunctionComponent<AdminPageProps> = () => {
  const [name, setName] = useState("");
  const headerBarProps = useHeaderBarProps();
  const fetcher = useFetcher<ActionData<RouteType<"root.community-list">>>();
  const snackbarQueue = useSnackbarQueue();
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (isBaseError(fetcher.data)) {
        snackbarQueue.append({
          children: (
            <Alert onClose={snackbarQueue.close} severity="error">
              Error creating community: {fetcher.data.message}
            </Alert>
          ),
        });
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
      <SequentialSnackbar queue={snackbarQueue} />
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
          <Toolbar />
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
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};