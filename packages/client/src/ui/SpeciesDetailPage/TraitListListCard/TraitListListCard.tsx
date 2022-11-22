import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useRouteSpecies } from "../useRouteSpecies";
import { AddBadge } from "../../AddBadge/AddBadge";
import { Card, CardHeader, Link } from "@mui/material";

export interface TraitListListCardProps {}

export const TraitListListCard: FC<TraitListListCardProps> = () => {
  const species = useRouteSpecies();
  return (
    <Card elevation={1}>
      <CardHeader
        title={`${species.name} - Trait Lists`}
        action={<AddBadge to="./add">Add One</AddBadge>}
        subheader={`All trait list templates available to ${species.name} are listed here.`}
      />
      <ul>
        {species.traitLists.map((tl) => (
          <li key={tl.id}>
            <Link component={RouterLink} to={`./${tl.id}`} state>
              {tl.name}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
};
