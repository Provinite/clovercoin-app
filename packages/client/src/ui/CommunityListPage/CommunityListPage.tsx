import { FC } from "react";
import { AppRoutes } from "../AppRoutes";
import { HeaderBar, HeaderBarSpacer } from "../HeaderBar/HeaderBar";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { SideNav } from "../SideNav/SideNav";
import SpaIcon from "@mui/icons-material/Spa";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useRouteLoaderDataOrFail } from "../../utils/loaderDataUtils";
import { GridRow } from "../lib/GridRow";
import { Link } from "../Link/Link";
import { usePageTitle } from "../../hooks/usePageTitle";

export const CommunityListPage: FC = () => {
  usePageTitle("CloverCoin Species - Communities");
  const headerBarProps = useHeaderBarProps();
  const communities = useRouteLoaderDataOrFail("root.community-list");
  return (
    <>
      <HeaderBar {...headerBarProps} title="Communities" />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
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
        <div css={{ flexGrow: 1 }}>
          <HeaderBarSpacer />
          <div css={(theme) => ({ padding: theme.spacing(2) })}>
            <Card elevation={1}>
              <CardHeader title={`Communities`} />
              <CardContent>
                <Grid container component={Box}>
                  {communities.map((community) => (
                    <GridRow xs={[12]} key={community.id}>
                      <Link
                        padding={2}
                        to={AppRoutes.speciesList(community.id)}
                      >
                        {community.name}
                      </Link>
                      <></>
                    </GridRow>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
