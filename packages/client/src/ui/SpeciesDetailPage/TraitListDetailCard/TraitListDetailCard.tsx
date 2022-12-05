import { Card, CardHeader } from "@mui/material";
import { FunctionComponent } from "react";
import { useRouteSpecies } from "../useRouteSpecies";
import { useRouteVariant } from "../useRouteTraitList";

export const TraitListDetailCard: FunctionComponent = () => {
  const traitList = useRouteVariant();
  const species = useRouteSpecies();
  return (
    <Card elevation={1}>
      <CardHeader
        title={`${species.name} - Variant - ${traitList.name}`}
        subheader="Set up traits for this variant here"
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
