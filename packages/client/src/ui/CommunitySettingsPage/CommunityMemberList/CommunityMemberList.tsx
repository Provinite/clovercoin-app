import { useQuery } from "@apollo/client";
import {
  isNotAuthenticatedError,
  GetCommunityMemberListDocument,
  GetCommunityMemberListQuery,
  GetCommunityMemberListQueryVariables,
  isCommunity,
  isRoleList,
  isIdentityList,
  Role,
  NarrowToCommunity,
  NarrowToIdentityList,
  isCommunityMember,
  isDeleteResponse,
  isCommunityInvitation,
  isBaseError,
  isNotFoundError,
} from "@clovercoin/api-client";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Box,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useBounceToLogin } from "../../../hooks/useBounceToLogin";
import { ActionData, RouteType } from "../../../routes";
import { useRouteCommunityOrFail } from "../../../useRouteCommunity";
import { stylesheet } from "../../../utils/emotion";
import { AppRoutes } from "../../AppRoutes";
import { GridRow } from "../../lib/GridRow";
import { useSnackbar } from "../../SequentialSnackbar/SequentialSnackbarContext";
import EmailIcon from "@mui/icons-material/Email";

export interface CommunityMemberListProps {}
export const CommunityMemberList: FC<CommunityMemberListProps> = () => {
  const community = useRouteCommunityOrFail();
  const { data } = useQuery<
    GetCommunityMemberListQuery,
    GetCommunityMemberListQueryVariables
  >(GetCommunityMemberListDocument, {
    variables: {
      communityId: community.id,
    },
  });
  const bounce = useBounceToLogin();

  const memberDeleteFetcher =
    useFetcher<ActionData<RouteType<"root.community.membership">>>();
  const memberCreateFetcher =
    useFetcher<ActionData<RouteType<"root.community.memberships">>>();
  const inviteFetcher =
    useFetcher<ActionData<RouteType<"root.community.invitations">>>();

  const [showRoleSelectDialog, setShowRoleSelectDialog] = useState(false);
  const [roleToInvite, setRoleToInvite] = useState<Pick<Role, "id" | "name">>();
  const [emailToInvite, setEmailToInvite] = useState("");

  const { appendSimpleSuccess, appendSimpleError } = useSnackbar();

  useEffect(() => {
    const { data, state } = memberCreateFetcher;
    if (isNotAuthenticatedError(data)) {
      bounce();
    }
    if (state === "idle") {
      if (data) {
        if (isCommunityMember(data)) {
          setShowRoleSelectDialog(false);
          appendSimpleSuccess(`Role granted`);
        } else {
          appendSimpleError(`Error: ${data.message}`);
        }
      }
    }
  }, [memberCreateFetcher.state, memberCreateFetcher.data]);

  useEffect(() => {
    const { data } = memberDeleteFetcher;
    if (isNotAuthenticatedError(data)) {
      bounce();
    }
    if (data) {
      if (isDeleteResponse(data)) {
        if (data.ok) {
          appendSimpleSuccess(`Role removed`);
        } else {
          appendSimpleError(`Error: role not removed`);
        }
      } else {
        appendSimpleError(`Error: ${data.message}`);
      }
    }
  }, [memberDeleteFetcher.data]);

  useEffect(() => {
    const { state, data } = inviteFetcher;
    if (isNotAuthenticatedError(data)) {
      bounce();
    }

    if (data && state === "idle") {
      if (isCommunityInvitation(data)) {
        setEmailToInvite("");
        setRoleToInvite(undefined);
        appendSimpleSuccess(`Invitation sent to ${emailToInvite}`);
      } else if (isNotFoundError(data)) {
        appendSimpleError(
          "No user with that email address was found. Have them join with an invite code instead!"
        );
      } else if (isBaseError(data)) {
        appendSimpleError(`Error: ${data.message}`);
      }
    }
  }, [inviteFetcher.state, inviteFetcher.data]);

  const [roleToAdd, setRoleToAdd] = useState<Pick<Role, "id" | "name">>();
  const [userToAddRoleTo, setUserToAddRoleTo] =
    useState<
      NarrowToIdentityList<
        NarrowToCommunity<GetCommunityMemberListQuery["community"]>["members"]
      >["list"][number]
    >();

  useEffect(() => {
    if (isNotAuthenticatedError(data?.community)) {
      bounce();
    }
  }, [data]);

  if (
    data &&
    isCommunity(data.community) &&
    isIdentityList(data.community.members)
  ) {
    return (
      <>
        <Grid container component={Box}>
          <Grid item xs={5} p={1}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={emailToInvite}
              onChange={({ target: { value } }) => setEmailToInvite(value)}
              required
              helperText="Enter an email here to invite a user"
              fullWidth
              disabled={inviteFetcher.state !== "idle"}
            />
          </Grid>
          <Grid item xs={5} p={1}>
            <TextField
              name="roleId"
              label="Role"
              value={roleToInvite?.id ?? ""}
              onChange={({ target: { value } }) =>
                setRoleToInvite(community.roles.find((r) => r.id === value))
              }
              select
              required
              helperText="Select a role to grant to the user when they join"
              fullWidth
              disabled={inviteFetcher.state !== "idle"}
            >
              {community.roles
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={2} css={ss.buttonGridItem}>
            <LoadingButton
              variant="contained"
              onClick={() => {
                if (!roleToInvite || !emailToInvite) {
                  return;
                }
                const formData = new FormData();
                formData.set("emailAddress", emailToInvite);
                formData.set("roleId", roleToInvite.id);
                inviteFetcher.submit(formData, {
                  action: AppRoutes.communityInvitationList(community.id),
                  method: "post",
                });
              }}
              startIcon={<EmailIcon />}
              disabled={!emailToInvite || !roleToInvite}
              loading={inviteFetcher.state !== "idle"}
            >
              Invite
            </LoadingButton>
            <Box css={ss.spacer}>&nbsp;</Box>
          </Grid>

          <GridRow xs={[6, 6]}>
            <Typography p={1} variant="body1" color="text.secondary">
              Username
            </Typography>
            <Typography p={1} variant="body1" color="text.secondary">
              Roles
            </Typography>
          </GridRow>
          {data.community.members.list.map((identity) => {
            if (isRoleList(identity.roles)) {
              return (
                <GridRow key={identity.id} xs={[6, 6]}>
                  <Typography p={2} variant="body1">
                    {identity.displayName}
                  </Typography>
                  <Box p={2}>
                    {identity.roles.list
                      .slice()
                      .sort((a, b) => {
                        return a.name.localeCompare(b.name);
                      })
                      .map(({ name: roleName, id: roleId }) => (
                        <Chip
                          key={roleName}
                          color={
                            (
                              {
                                Admin: "error",
                                Moderator: "success",
                                Member: "info",
                              } as const
                            )[roleName]
                          }
                          label={roleName}
                          onDelete={() => {
                            memberDeleteFetcher.submit(null, {
                              action: AppRoutes.communityMemberDetail(
                                community.id,
                                identity.id,
                                roleId
                              ),
                              method: "delete",
                            });
                          }}
                          css={ss.chip}
                        />
                      ))}
                    <Chip
                      color="default"
                      label="Add One"
                      icon={<AddIcon />}
                      onClick={() => {
                        setUserToAddRoleTo(identity);
                        setShowRoleSelectDialog(true);
                      }}
                      css={ss.chip}
                    />
                  </Box>
                </GridRow>
              );
            }
          })}
        </Grid>
        <Dialog
          TransitionProps={{
            onExited: () => {
              setUserToAddRoleTo(undefined);
              setRoleToAdd(undefined);
            },
          }}
          open={showRoleSelectDialog}
          onClose={() => setShowRoleSelectDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Grant {userToAddRoleTo?.displayName ?? ""} a role
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose a role to grant {userToAddRoleTo?.displayName ?? ""}
            </DialogContentText>
            <br />
            <TextField
              select
              fullWidth
              label="Choose a role"
              value={roleToAdd?.id ?? ""}
              onChange={({ target: { value } }) => {
                setRoleToAdd(community.roles.find((role) => role.id === value));
              }}
            >
              {isRoleList(userToAddRoleTo?.roles) &&
                community.roles.map((role) => {
                  const disabled =
                    !isRoleList(userToAddRoleTo?.roles) ||
                    userToAddRoleTo?.roles.list.some((r) => r.id === role.id);
                  return (
                    <MenuItem value={role.id} disabled={disabled}>
                      {role.name} {disabled && "(already has role)"}
                    </MenuItem>
                  );
                })}
            </TextField>
            <DialogActions>
              <Button onClick={() => setShowRoleSelectDialog(false)}>
                Cancel
              </Button>
              <LoadingButton
                disabled={
                  !roleToAdd ||
                  !userToAddRoleTo ||
                  memberCreateFetcher.state !== "idle"
                }
                onClick={() => {
                  const formData = new FormData();
                  formData.set("roleId", roleToAdd!.id);
                  formData.set("identityId", userToAddRoleTo!.id);
                  memberCreateFetcher.submit(formData, {
                    action: AppRoutes.communityMemberList(community.id),
                    method: "post",
                  });
                }}
                loading={memberCreateFetcher.state !== "idle"}
              >
                Grant Role
              </LoadingButton>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </>
    );
  }
  return <></>;
};

const ss = stylesheet({
  chip: (theme) => ({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }),
  spacer: {
    display: "block",
    height: "20px",
  },
  buttonGridItem: (theme) => ({
    flexDirection: "column",
    display: "flex",
    padding: theme.spacing(1),
    justifyContent: "center",
  }),
});
