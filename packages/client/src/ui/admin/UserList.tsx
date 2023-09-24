import { useQuery } from "@apollo/client";
import {
  GetIdentityListDocument,
  GetIdentityListQuery,
  Identity,
  isIdentityList,
  isNotAuthenticatedError,
} from "@clovercoin/api-client";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useBounceToLogin } from "../../hooks/useBounceToLogin";
import { ActionData, RouteType } from "../../routes";
import { stylesheet } from "../../utils/emotion";
import { AppRoutes } from "../AppRoutes";
import { GridRow } from "../lib/GridRow";
import { TextStack } from "../SpeciesDetailPage/TraitListDetailCard/TextStack";

export interface UserListProps {}
export const UserList: FC<UserListProps> = () => {
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
        <GridRow xs={[6, 6]}>
          <Typography p={1} variant="body1" color="text.secondary">
            Username
          </Typography>
          <Typography p={1} variant="body1" color="text.secondary">
            Email
          </Typography>
        </GridRow>
        {data.identities.list.map((identity) => (
          <UserListItem identity={identity} key={identity.id} />
        ))}
      </Grid>
    );
  }
  return <></>;
};

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
  const { submit, state } =
    useFetcher<ActionData<RouteType<"root.identity">>>();
  return (
    <>
      <GridRow key={identity.id} xs={[3, 3, 1, 5]}>
        <Typography p={2} variant="body1">
          {identity.displayName}
        </Typography>
        <Typography p={2} variant="body1">
          {identity.email}
        </Typography>
        <Box css={[ss.cell, ss.expandCell]}>
          <IconButton onClick={() => setExpanded((e) => !e)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <></>
      </GridRow>
      <Collapse in={expanded}>
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
                            data.set(perm, hasPermission ? "false" : "true");
                            submit(data, {
                              action: AppRoutes.identityDetail(identity.id),
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
      </Collapse>
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }),
  permissionsText: (theme) => ({
    marginBottom: theme.spacing(2),
  }),
});
