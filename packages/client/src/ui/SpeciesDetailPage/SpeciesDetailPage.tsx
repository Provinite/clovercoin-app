import { FC, ReactNode, useMemo } from "react";
import {
  GetSpeciesDetailQuery,
  NarrowToSpeciesList,
} from "@clovercoin/api-client";
import { HeaderBar, HeaderBarSpacer } from "../HeaderBar/HeaderBar";
import { HeaderBarProps } from "../HeaderBar/HeaderBarProps";
import { useRouteCommunityOrFail } from "../../useRouteCommunity";
import { NavItem, SideNav } from "../SideNav/SideNav";
import { AppRoutes } from "../AppRoutes";
import InterestsIcon from "@mui/icons-material/Interests";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import NatureIcon from "@mui/icons-material/Nature";
import SchemaIcon from "@mui/icons-material/Schema";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SpaIcon from "@mui/icons-material/Spa";
import { useRouteVariant } from "./useRouteVariant";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePageTitle } from "../../hooks/usePageTitle";

export interface SpeciesDetailPageProps {
  headerBarProps: HeaderBarProps;
  species: NarrowToSpeciesList<
    GetSpeciesDetailQuery["species"]
  >["list"][number];
  children?: ReactNode;
}

export const SpeciesDetailPage: FC<SpeciesDetailPageProps> = ({
  headerBarProps,
  species,
  children,
}) => {
  const community = useRouteCommunityOrFail();
  usePageTitle(`${community.name} - ${species.name}`);
  const variant = useRouteVariant();
  const navGroups = useMemo<NavItem[]>(() => {
    const communityId = community.id;
    return [
      {
        to: AppRoutes.communityList(),
        children: community.name,
        icon: <SpaIcon />,
        childNavItems: [
          {
            to: AppRoutes.speciesList(communityId),
            children: `Species`,
            icon: <MovieFilterIcon />,
            childNavItems: [
              {
                to: AppRoutes.speciesDetail(communityId, species.id),
                children: species.name,
                icon: <NatureIcon />,
                childNavItems: [
                  {
                    to: AppRoutes.speciesTraitList(communityId, species.id),
                    children: "Traits",
                    icon: <InterestsIcon />,
                    partialUrlMatch: true,
                  },
                  {
                    to: AppRoutes.speciesVariantList(communityId, species.id),
                    children: "Variants",
                    icon: <SchemaIcon />,
                    childNavItems: variant
                      ? [
                          {
                            to: AppRoutes.speciesVariantDetail(
                              community.id,
                              species.id,
                              variant.id
                            ),
                            children: variant.name,
                          },
                        ]
                      : undefined,
                  },
                ],
              },
            ],
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
    ];
  }, [community, species, variant]);

  return (
    <>
      <HeaderBar
        {...headerBarProps}
        title={`${community.name} - ${species.name}`}
      />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        <SideNav navItems={navGroups} />
        <div css={{ flexGrow: 1 }}>
          <HeaderBarSpacer />
          <div css={(theme) => ({ padding: theme.spacing(2) })}>{children}</div>
        </div>
      </div>
    </>
  );
};
