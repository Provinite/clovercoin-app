import { Stack, Box } from "@mui/system";
import { FC } from "react";
import { useRouteCommunityOrFail } from "../../useRouteCommunity";
import { AppRoutes } from "../AppRoutes";
import { HeaderBar, HeaderBarSpacer } from "../HeaderBar/HeaderBar";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { SideNav } from "../SideNav/SideNav";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SpaIcon from "@mui/icons-material/Spa";
import SettingsIcon from "@mui/icons-material/Settings";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useRouteRolesOrFail } from "./useRouteRoles";
import { CommunityRoleListItem } from "./CommunityRoleListItem";
import { GridRow } from "../lib/GridRow";
import { TextStack } from "../SpeciesDetailPage/TraitListDetailCard/TextStack";
import { stylesheet } from "../../utils/emotion";
import { InviteCodeList } from "../InviteCodeList/InviteCodeList";

export const CommunitySetttingsPage: FC = () => {
  const headerBarProps = useHeaderBarProps();
  const community = useRouteCommunityOrFail();
  const roles = useRouteRolesOrFail();
  return (
    <>
      <HeaderBar {...headerBarProps} title="Community Settings" />
      <Stack direction="row">
        <SideNav
          navItems={[
            {
              to: AppRoutes.communityList(),
              children: community.name,
              icon: <SpaIcon />,
              childNavItems: [
                {
                  to: AppRoutes.speciesList(community.id),
                  children: "Species",
                  icon: <MovieFilterIcon />,
                },
                {
                  to: AppRoutes.communitySettings(community.id),
                  children: "Community Settings",
                  icon: <SettingsIcon />,
                },
              ],
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
                <CardHeader
                  title="Roles & Permissions"
                  subheader={
                    "Manage your community's roles, and their associated" +
                    " permissions here. Users can be assigned one or more roles in" +
                    " our community, and will have permissions granted by those roles."
                  }
                />
                <CardContent>
                  <Grid container padding={1}>
                    <GridRow xs={[3, 9]}>
                      <TextStack primary="Role Name" css={ss.header} />
                      <Box />
                    </GridRow>
                    {roles.map((r) => (
                      <CommunityRoleListItem key={r.id} role={r} />
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={1}>
                <CardHeader title="Invite Codes" />
                <InviteCodeList />
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};
const ss = stylesheet({
  header: (theme) => ({
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }),
});
