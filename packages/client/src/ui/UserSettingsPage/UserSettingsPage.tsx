import {
  isBaseError,
  isCommunityInvitation,
  isCommunityInvitationList,
} from "@clovercoin/api-client";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SpaIcon from "@mui/icons-material/Spa";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";
import { ActionData, RouteType } from "../../routes";
import { createRequiredLoaderDataHook } from "../../utils/loaderDataUtils";
import { AppRoutes } from "../AppRoutes";
import { HeaderBar, HeaderBarSpacer } from "../HeaderBar/HeaderBar";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { GridRow } from "../lib/GridRow";
import { useSnackbar } from "../SequentialSnackbar/SequentialSnackbarContext";
import { SideNav } from "../SideNav/SideNav";
const useSettings = createRequiredLoaderDataHook("root.settings");

export const UserSettingsPage: FC = () => {
  const { pendingInvitations } = useSettings();
  const headerBarProps = useHeaderBarProps();
  usePageTitle("CloverCoin Species - Settings");

  const snackbar = useSnackbar();

  const { submit, data, state } =
    useFetcher<ActionData<RouteType<"root.settings.community-invitation">>>();

  useEffect(() => {
    if (state === "idle" && data) {
      if (isCommunityInvitation(data)) {
        snackbar.appendSimpleSuccess(
          `Invitation ${data.accepted ? "accepted!" : "dismissed"}`
        );
      } else if (isBaseError(data)) {
        snackbar.appendSimpleError(`Error: ${data.message || data.__typename}`);
      }
    }
  }, [data, state]);
  return (
    <>
      <HeaderBar {...headerBarProps} title="Settings" />
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
                <CardHeader title="Settings" />
                <CardContent>Manage your account here.</CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={1}>
                <CardHeader title="Pending Invitations" />
                <CardContent>
                  <Typography variant="body1" mb={1}>
                    Invitations to new communities will show up here
                  </Typography>
                  <Grid container>
                    <GridRow xs={[3, 3, 3, 1, 1, 1]}>
                      <Typography p={1} variant="body1" color="text.secondary">
                        Community
                      </Typography>
                      <Typography p={1} variant="body1" color="text.secondary">
                        Role
                      </Typography>
                      <Typography p={1} variant="body1" color="text.secondary">
                        Invited By
                      </Typography>
                      <></>
                      <></>
                      <></>
                    </GridRow>
                    {(() => {
                      if (isCommunityInvitationList(pendingInvitations)) {
                        if (pendingInvitations.list.length === 0) {
                          return (
                            <GridRow xs={[12]}>
                              {[
                                <Typography variant="body2" p={2} key={0}>
                                  No pending invitations
                                </Typography>,
                              ]}
                            </GridRow>
                          );
                        }
                        return pendingInvitations.list.map((invitation) => (
                          <GridRow key={invitation.id} xs={[3, 3, 3, 1, 1, 1]}>
                            <Typography p={2} variant="body1">
                              {invitation.role.community.name}
                            </Typography>
                            <Typography p={2} variant="body1">
                              {invitation.role.name}
                            </Typography>
                            <Typography p={2} variant="body1">
                              {invitation.inviter.displayName}
                            </Typography>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              flexGrow={1}
                            >
                              <Button
                                variant="contained"
                                color="success"
                                disabled={state !== "idle"}
                                onClick={() => {
                                  const formData = new FormData();
                                  formData.set("accept", "true");
                                  submit(formData, {
                                    action: AppRoutes.communityInvitationDetail(
                                      invitation.id
                                    ),
                                    method: "post",
                                  });
                                }}
                              >
                                Accept
                              </Button>
                            </Stack>
                            <></>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              flexGrow={1}
                            >
                              <Button
                                variant="contained"
                                color="error"
                                disabled={state !== "idle"}
                                onClick={() => {
                                  const formData = new FormData();
                                  formData.set("accept", "false");
                                  submit(formData, {
                                    action: AppRoutes.communityInvitationDetail(
                                      invitation.id
                                    ),
                                    method: "post",
                                  });
                                }}
                              >
                                Ignore
                              </Button>
                            </Stack>
                          </GridRow>
                        ));
                      }
                    })()}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};
