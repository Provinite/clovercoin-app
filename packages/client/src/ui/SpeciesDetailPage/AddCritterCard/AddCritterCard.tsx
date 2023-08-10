import { Card, CardContent, CardHeader } from "@mui/material";
import { FC } from "react";
import { useFetcher } from "react-router-dom";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { AppRoutes } from "../../AppRoutes";
import { CritterForm } from "../../CritterForm/CritterForm";
import { useCritterForm } from "../../CritterForm/useCritterForm";
import { useRouteSpecies } from "../useRouteSpecies";

export interface AddCritterCardProps {}
export const AddCritterCard: FC = () => {
  const fetcher = useFetcher();
  const species = useRouteSpecies();
  const community = useRouteCommunity();
  const [form, dispatch] = useCritterForm();

  return (
    <Card>
      <CardHeader
        title={`Create A ${species.name}`}
        subheader={`Provide details about a specific critter here to add it to the list.`}
      />
      <CardContent>
        <CritterForm
          value={form}
          dispatch={dispatch}
          action={AppRoutes.addCritter(community.id, species.id)}
          fetcher={fetcher}
          method="post"
          species={species}
        />
      </CardContent>
    </Card>
  );
};

export const ConnectedAddCritterCard = AddCritterCard;
