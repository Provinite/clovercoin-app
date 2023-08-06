import { FC } from "react";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { useRouteLoaderData } from "../../../utils/loaderDataUtils";
import { CritterListCard } from "../CritterListCard/CritterListCard";
import { SpeciesSummaryCard } from "../SummaryCard/SpeciesSummaryCard";
import { useRouteSpecies } from "../useRouteSpecies";

export const SpeciesIndex: FC = () => {
  const species = useRouteSpecies();
  const community = useRouteCommunity();
  const critters = useRouteLoaderData("root.community.species.index");
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
