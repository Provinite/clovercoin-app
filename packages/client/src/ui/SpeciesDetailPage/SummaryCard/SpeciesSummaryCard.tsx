import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { pluralize } from "../../../utils/pluralize";
import { useRouteSpecies } from "../useRouteSpecies";

interface SpeciesSummaryCardProps {}

export const SpeciesSummaryCard: FunctionComponent<
  SpeciesSummaryCardProps
> = () => {
  const species = useRouteSpecies();
  const community = useRouteCommunity();
  return (
    <Card elevation={1}>
      <CardHeader
        title={species.name}
        subheader={`A ${community.name} species.`}
      />
      <CardContent>
        <Typography paragraph variant="body1">
          Are a species with {species.variants.length}{" "}
          {pluralize(species.variants.length, "variant")}
        </Typography>
      </CardContent>
    </Card>
  );
};
