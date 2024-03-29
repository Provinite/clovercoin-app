import { useQuery } from "@apollo/client";
import {
  GetIdentityListDocument,
  GetIdentityListQuery,
  Identity,
  isIdentityList,
  isNotAuthenticatedError,
} from "@clovercoin/api-client";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRight from "@mui/icons-material/ChevronRight";
import {
  Box,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useBounceToLogin } from "../../hooks/useBounceToLogin";
import { ActionData, RouteType } from "../../routes";
import { stylesheet } from "../../utils/emotion";
import { AppRoutes } from "../AppRoutes";
import { GridRow } from "../lib/GridRow";
import { TextStack } from "../SpeciesDetailPage/TraitListDetailCard/TextStack";

const gridSize = [3, 3, 6];

export interface UserListProps {}
export const UserListComponent: FC<UserListProps> = () => {
  const { data } = useQuery<GetIdentityListQuery>(GetIdentityListDocument);
  const bounce = useBounceToLogin();
  useEffect(() => {
    if (isNotAuthenticatedError(data?.identities)) {
      bounce();
    }
  }, [data]);
  if (data && isIdentityList(data.identities)) {
    return (
      <Grid container component={Box}>
        <GridRow xs={gridSize}>
          <Typography p={1} variant="body1" color="text.secondary">
            Username
          </Typography>
          <Typography p={1} variant="body1" color="text.secondary">
            Email
          </Typography>
          <></>
        </GridRow>
        {data.identities.list.map((identity) => (
          <UserListItem identity={identity} key={identity.id} />
        ))}
      </Grid>
    );
  }
  return <></>;
};

/**
 * Memoized to resolve some nasty performance issues on the admin page.
 */
export const UserList = memo(UserListComponent);

export interface UserListItemProps {
  identity: Pick<
    Identity,
    "id" | "displayName" | "email" | (`can${string}` & keyof Identity)
  >;
}

const permissions: Record<
  keyof Identity & `can${string}`,
  { helpText: string; label: string }
> = {
  canCreateCommunity: {
    label: "Create Communities",
    helpText: "Create Communities for any Species",
  },
  canListIdentities: {
    label: "View Global Users",
    helpText: "View the global user list, including emails",
  },
  canCreateInviteCode: {
    label: "Create Global Invite Codes",
    helpText: "Create invite codes with no (or any) community role attached",
  },
  canListInviteCodes: {
    label: "View Global Invite Codes",
    helpText: "View all invite codes in the system",
  },
  canGrantGlobalPermissions: {
    label: "Grant & Revoke Global Permissions",
    helpText: "Grant modify users' permissions in this list",
  },
};
const permKeys = Object.keys(permissions) as Array<keyof typeof permissions>;
const UserListItem: FC<UserListItemProps> = ({ identity }) => {
  const [expanded, setExpanded] = useState(false);
  const [renderCollapse, setRenderCollapse] = useState(false);
  const { submit, state } =
    useFetcher<ActionData<RouteType<"root.identity">>>();
  return (
    <>
      <Grid item xs={3}>
        <Typography p={2} variant="body1">
          <IconButton
            onClick={useCallback(() => {
              setRenderCollapse(true);
              setExpanded((e) => !e);
            }, [])}
          >
            {expanded ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
          {identity.displayName}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography p={2} variant="body1">
          {identity.email}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Collapse
          onExited={useCallback(() => setRenderCollapse(false), [])}
          in={expanded}
        >
          {renderCollapse && (
            <>
              <Box css={ss.collapse}>
                <TextStack
                  css={ss.permissionsText}
                  primary="Global Admin Permission Settings"
                  secondary={
                    `Control what ${identity.displayName} can do here. ` +
                    `Each checkbox below controls a set of related actions ` +
                    `in the system.`
                  }
                />
                <Grid container rowGap={2}>
                  {permKeys.map((perm) => {
                    const hasPermission = identity[perm] === true;
                    const { label, helpText } = permissions[perm];
                    return (
                      <Grid item xs={6} key={perm}>
                        <FormControl>
                          <FormControlLabel
                            control={
                              <Switch
                                disabled={state !== "idle"}
                                checked={hasPermission}
                                onChange={() => {
                                  const data = new FormData();
                                  data.set(
                                    perm,
                                    hasPermission ? "false" : "true"
                                  );
                                  submit(data, {
                                    action: AppRoutes.identityDetail(
                                      identity.id
                                    ),
                                    method: "patch",
                                  });
                                }}
                              />
                            }
                            label={label}
                          />
                          <FormHelperText>{helpText}</FormHelperText>
                        </FormControl>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              <Divider />
            </>
          )}
        </Collapse>
      </Grid>
    </>
  );
};
const ss = stylesheet({
  cell: (theme) => ({
    padding: theme.spacing(1),
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),
  expandCell: { alignItems: "center" },
  permissionsSection: (theme) => ({
    paddingLeft: theme.spacing(2),
  }),
  collapse: (theme) => ({
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(8),
  }),
  permissionsText: (theme) => ({
    marginBottom: theme.spacing(2),
  }),
});
