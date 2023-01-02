import { FC, ReactNode, useMemo } from "react";
import {
  GetSpeciesDetailQuery,
  NarrowToSpeciesList,
} from "@clovercoin/api-client";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { HeaderBarProps } from "../HeaderBar/HeaderBarProps";
import { useRouteCommunity } from "../../useRouteCommunity";
import { Toolbar } from "@mui/material";
import { NavItem, SideNav } from "../SideNav/SideNav";
import InterestsIcon from "@mui/icons-material/Interests";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import NatureIcon from "@mui/icons-material/Nature";
import SchemaIcon from "@mui/icons-material/Schema";
import { AppRoutes } from "../AppRoutes";

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
  const community = useRouteCommunity();

  const navGroups = useMemo<NavItem[]>(() => {
    const communityId = community.id;
    return [
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
              },
              {
                to: AppRoutes.speciesVariantList(communityId, species.id),
                children: "Variants",
                icon: <SchemaIcon />,
                childNavItems: species.traitLists.map((tl) => ({
                  to: AppRoutes.speciesVariantDetail(
                    community.id,
                    species.id,
                    tl.id
                  ),
                  children: tl.name,
                })),
              },
            ],
          },
        ],
      },
    ];
  }, [community, species]);

  return (
    <>
      <HeaderBar
        {...headerBarProps}
        title={`${community.name}: Species - ${species.name}`}
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
          <Toolbar />
          <div css={(theme) => ({ padding: theme.spacing(2) })}>{children}</div>
        </div>
      </div>
    </>
  );
};
