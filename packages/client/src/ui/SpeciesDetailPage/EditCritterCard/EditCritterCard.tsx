import { Card, CardContent, CardHeader } from "@mui/material";
import { FC } from "react";
import { useFetcher } from "react-router-dom";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useRouteCommunityOrFail } from "../../../useRouteCommunity";
import { useRouteLoaderDataOrFail } from "../../../utils/loaderDataUtils";
import { AppRoutes } from "../../AppRoutes";
import { CritterForm } from "../../CritterForm/CritterForm";
import { useCritterForm } from "../../CritterForm/useCritterForm";
import { useRouteSpeciesOrFail } from "../useRouteSpecies";

export interface EditCritterCardProps {}
export const EditCritterCard: FC = () => {
  const community = useRouteCommunityOrFail();
  const critter = useRouteLoaderDataOrFail("root.community.species.critter");
  usePageTitle(`${community.name} - Edit ${critter.name}`);
  const fetcher = useFetcher();
  const species = useRouteSpeciesOrFail();
  const [form, dispatch] = useCritterForm(critter);
  return (
    <Card>
      <CardHeader
        title={`Edit ${critter.name}`}
        subheader={`Update your critter's traits here.`}
      />
      <CardContent>
        <CritterForm
          fetcher={fetcher}
          action={AppRoutes.critterDetail(community.id, species.id, critter.id)}
          value={form}
          dispatch={dispatch}
          species={species}
          method="put"
        />
      </CardContent>
    </Card>
  );
};

export const ConnectedEditCritterCard = EditCritterCard;
