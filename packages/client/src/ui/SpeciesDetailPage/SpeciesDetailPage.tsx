import { FC, ReactNode, useMemo } from "react";
import { GetSpeciesDetailQuery } from "../../generated/graphql";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { HeaderBarProps } from "../HeaderBar/HeaderBarProps";
import { useRouteCommunity } from "./useRouteCommunity";
import { Toolbar } from "@mui/material";
import { NavItem, SideNav } from "../SideNav/SideNav";
import InterestsIcon from "@mui/icons-material/Interests";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import NatureIcon from "@mui/icons-material/Nature";
import SchemaIcon from "@mui/icons-material/Schema";
export interface SpeciesDetailPageProps {
  headerBarProps: HeaderBarProps;
  species: GetSpeciesDetailQuery["species"][number];
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
    const speciesListUrl = `/community/${communityId}/species/`;
    const speciesDetailUrl = `${speciesListUrl}${species.id}`;

    return [
      {
        to: speciesListUrl,
        children: `Species`,
        icon: <MovieFilterIcon />,
        childNavItems: [
          {
            to: `${speciesDetailUrl}/`,
            children: species.name,
            icon: <NatureIcon />,
            childNavItems: [
              {
                to: `${speciesDetailUrl}/traits/`,
                children: "Traits",
                icon: <InterestsIcon />,
              },
              {
                to: `${speciesDetailUrl}/trait-lists/`,
                children: "Trait Lists",
                icon: <SchemaIcon />,
                childNavItems: species.traitLists.map((tl) => ({
                  to: `${speciesDetailUrl}/trait-lists/${tl.id}`,
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
        title={`${community.name} Species - ${species.name}`}
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
          <div css={{ padding: "18px" }}>{children}</div>
        </div>
      </div>
    </>
  );
};
