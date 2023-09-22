import { FC } from "react";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useRouteCommunityOrFail } from "../../../useRouteCommunity";
import { useRouteLoaderDataOrFail } from "../../../utils/loaderDataUtils";
import { CritterListCard } from "../CritterListCard/CritterListCard";
import { SpeciesSummaryCard } from "../SummaryCard/SpeciesSummaryCard";
import { useRouteSpeciesOrFail } from "../useRouteSpecies";

export const SpeciesIndex: FC = () => {
  const species = useRouteSpeciesOrFail();
  const community = useRouteCommunityOrFail();
  usePageTitle(`${community.name} - ${species.name}`);
  const critters = useRouteLoaderDataOrFail("root.community.species.index");
  return (
    <>
      <SpeciesSummaryCard />
      <CritterListCard
        css={(theme) => ({ marginTop: theme.spacing(2) })}
        species={species}
        critters={critters}
        community={community}
      />
    </>
  );
};
