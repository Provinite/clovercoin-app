import { Card, CardHeader } from "@mui/material";
import { FunctionComponent } from "react";
import { AddBadge } from "../../AddBadge/AddBadge";
import { useRouteSpecies } from "../useRouteSpecies";
import { useRouteTraitList } from "../useRouteTraitList";

export const TraitListDetailCard: FunctionComponent = () => {
  const traitList = useRouteTraitList();
  const species = useRouteSpecies();
  return (
    <Card elevation={1}>
      <CardHeader
        title={`${species.name} - Trait List - ${traitList.name}`}
        action={<AddBadge to="./add">Add One</AddBadge>}
        subheader="Set up traits for this trait list template here"
      />
      <ul>
        {traitList.traitListEntries.map((tle) => (
          <li key={tle.id}>
            {tle.trait.name} ({tle.trait.valueType})
          </li>
        ))}
      </ul>
    </Card>
  );
};
