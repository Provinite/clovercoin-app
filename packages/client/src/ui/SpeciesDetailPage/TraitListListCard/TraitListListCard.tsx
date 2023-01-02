import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useRouteSpecies } from "../useRouteSpecies";
import { Card, CardHeader, Link } from "@mui/material";
import { AppRoutes } from "../../AppRoutes";
import { useRouteCommunity } from "../../../useRouteCommunity";

export interface TraitListListCardProps {}

export const TraitListListCard: FC<TraitListListCardProps> = () => {
  const species = useRouteSpecies();
  const community = useRouteCommunity();
  return (
    <Card elevation={1}>
      <CardHeader
        title={`${species.name}: Variants`}
        subheader={`All variants available to ${species.name} are listed here.`}
      />
      <ul>
        {species.traitLists.map((tl) => (
          <li key={tl.id}>
            <Link
              component={RouterLink}
              to={AppRoutes.speciesVariantDetail(
                community.id,
                species.id,
                tl.id
              )}
              state
            >
              {tl.name}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
};
