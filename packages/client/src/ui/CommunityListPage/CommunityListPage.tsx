import { FC } from "react";
import { AppRoutes } from "../AppRoutes";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { SideNav } from "../SideNav/SideNav";
import SpaIcon from "@mui/icons-material/Spa";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Toolbar,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useRouteLoaderData } from "../../utils/loaderDataUtils";
import { GridRow } from "../lib/GridRow";

export const CommunityListPage: FC = () => {
  const headerBarProps = useHeaderBarProps();
  const communities = useRouteLoaderData("root.community-list");
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
          ]}
        />
        <div css={{ flexGrow: 1 }}>
          <Toolbar />
          <Card elevation={1}>
            <CardHeader title={`Communities`} />
            <CardContent>
              <Grid container component={Box}>
                {communities.map((community) => (
                  <GridRow xs={[12]}>
                    <Link
                      p={2}
                      component={RouterLink}
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
    </>
  );
};
