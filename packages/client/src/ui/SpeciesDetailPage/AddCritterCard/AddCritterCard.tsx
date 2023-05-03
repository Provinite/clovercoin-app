import { Species } from "@clovercoin/api-client";
import { Card, CardContent, CardHeader } from "@mui/material";
import { FC } from "react";
import { useRouteSpecies } from "../useRouteSpecies";

export interface AddCritterCardProps {
  species: Pick<Species, "id" | "name">;
}
export const AddCritterCard: FC<AddCritterCardProps> = ({ species }) => (
  <Card>
    <CardHeader title={`Create A ${species.name}`} />
    <CardContent></CardContent>
  </Card>
);

export const ConnectedAddCritterCard = () => (
  <AddCritterCard species={useRouteSpecies()}></AddCritterCard>
);
