import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
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
import { isBaseError, isNotAuthorizedError } from "@clovercoin/api-client";
import { UserList } from "./UserList";
import { InviteCodeList } from "../InviteCodeList/InviteCodeList";
import { useSnackbar } from "../SequentialSnackbar/SequentialSnackbarContext";
import { usePageTitle } from "../../hooks/usePageTitle";

export interface AdminPageProps {}
export const AdminPage: FunctionComponent<AdminPageProps> = () => {
  const [name, setName] = useState("");
  const formRef = useRef<HTMLFormElement | null>();
  const [
    showConfirmCreateCommunityDialog,
    setShowConfirmCreateCommunityDialog,
  ] = useState(false);
  const headerBarProps = useHeaderBarProps();
  const fetcher = useFetcher<ActionData<RouteType<"root.community-list">>>();
  const snackbarQueue = useSnackbar();
  usePageTitle("CloverCoin Species - Site Administration");
  useEffect(() => {
    const { data, state } = fetcher;
    if (state === "idle" && data) {
      if (isNotAuthorizedError(data)) {
        return;
      }
      if (isBaseError(data)) {
        snackbarQueue.appendSimpleError(
          `Error creating community: ${data.message || data.__typename}`
        );
        return;
      }
      const { name, id } = data;
      setName("");
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
            {/* Create Community Form */}
            <Grid item xs={12}>
              <fetcher.Form
                ref={(e) => (formRef.current = e)}
                method="post"
                action={AppRoutes.communityList()}
                css={{ display: "contents" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowConfirmCreateCommunityDialog(true);
                }}
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
                    <Button variant="contained" type="submit" disabled={!name}>
                      Create
                    </Button>
                  </CardActions>
                </Card>
              </fetcher.Form>
              {/* Confirm create community dialog */}
              <Dialog open={showConfirmCreateCommunityDialog}>
                <DialogTitle>Create community "{name}"?</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    This will create a new community with you as its sole
                    member.
                  </DialogContentText>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setShowConfirmCreateCommunityDialog(false);
                      }}
                    >
                      No, go back
                    </Button>
                    <Button
                      onClick={() => {
                        fetcher.submit(formRef.current!);
                        setShowConfirmCreateCommunityDialog(false);
                      }}
                    >
                      Yes, create this community
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
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
