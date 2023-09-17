import {
  GetCommunityRolesQuery,
  isBaseError,
  isRole,
  NarrowToCommunity,
  Role,
} from "@clovercoin/api-client";
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
import { GridRow } from "../lib/GridRow";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { stylesheet } from "../../utils/emotion";
import { TextStack } from "../SpeciesDetailPage/TraitListDetailCard/TextStack";
import { useFetcher } from "react-router-dom";
import { ActionData, RouteType } from "../../routes";
import { AppRoutes } from "../AppRoutes";
import { useRouteCommunityOrFail } from "../../useRouteCommunity";
import { useSnackbar } from "../SequentialSnackbar/SequentialSnackbarContext";
import { assertNever } from "../../utils/assertNever";

const permissions: Record<
  keyof Role & `can${string}`,
  { helpText: string; label: string }
> = {
  canCreateCritter: {
    label: "Create Critters",
    helpText: "Create Critters for any Species",
  },
  canCreateSpecies: { label: "Create Species", helpText: "Create new Species" },
  canEditCritter: {
    label: "Edit Critters",
    helpText: "Edit all Critters for any Species",
  },
  canEditSpecies: {
    label: "Edit Species",
    helpText: "Edit any species traits, name, settings",
  },
  canCreateInviteCode: {
    label: "Create Invite Codes",
    helpText: "Create invite codes for any invitable role in this community",
  },
  canListInviteCodes: {
    label: "Read Invite Codes",
    helpText: "Access to the inivite code list",
  },
  canCreateRole: {
    label: "Create Roles",
    helpText: "Define new roles and grant ANY permissions. Admins only!",
  },
  canEditRole: {
    label: "Edit Roles",
    helpText:
      "Modify the permissions associated with roles. Can grant ANY permissions. Admins only!",
  },
};

const permKeys = Object.keys(permissions) as Array<keyof Role & `can${string}`>;

export interface CommunityRoleListItemProps {
  role: NarrowToCommunity<GetCommunityRolesQuery["community"]>["roles"][number];
}
export const CommunityRoleListItem: FC<CommunityRoleListItemProps> = ({
  role,
}) => {
  const community = useRouteCommunityOrFail();

  const [expanded, setExpanded] = useState(false);
  const { submit, data, state } =
    useFetcher<ActionData<RouteType<"root.community.role">>>();

  const { appendSimpleError, appendSimpleSuccess } = useSnackbar();
  useEffect(() => {
    if (state === "idle" && data) {
      if (isBaseError(data)) {
        appendSimpleError(data.message);
      } else if (isRole(data)) {
        appendSimpleSuccess(`Updated ${data.name} role.`);
      } else {
        assertNever(data);
      }
    }
  }, [data, state]);
  return (
    <>
      <GridRow xs={[3, 9]}>
        {/* Name */}
        <Typography css={ss.cell} variant="body1">
          {role.name}
        </Typography>
        <Box css={[ss.cell, ss.expandCell]}>
          <IconButton onClick={() => setExpanded((e) => !e)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </GridRow>
      <Grid item xs={12} css={ss.permissionsSection}>
        <Collapse in={expanded}>
          <Box css={ss.collapse}>
            <TextStack
              css={ss.permissionsText}
              primary="Permission Settings"
              secondary={
                `Control what a(n) ${role.name} can do here. ` +
                `Each checkbox below controls a set of related actions ` +
                `in the system.`
              }
            />
            <Grid container rowGap={2}>
              {permKeys.map((perm) => {
                const hasPermission = role[perm] === true;
                const { label, helpText } = permissions[perm];
                return (
                  <Grid item xs={6} key={perm}>
                    <FormControl>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={hasPermission}
                            onChange={() => {
                              const data = new FormData();
                              data.set(perm, hasPermission ? "false" : "true");
                              submit(data, {
                                action: AppRoutes.roleDetail(
                                  community.id,
                                  role.id
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }),
  permissionsText: (theme) => ({
    marginBottom: theme.spacing(2),
  }),
});
