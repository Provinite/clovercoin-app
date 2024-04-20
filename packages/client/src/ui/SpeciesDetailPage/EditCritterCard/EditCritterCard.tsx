import { isCritter, isBaseError } from "@clovercoin/api-client";
import { Card, CardContent, CardHeader } from "@mui/material";
import { FC, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { ActionData, RouteType } from "../../../routes";
import { useRouteCommunityOrFail } from "../../../useRouteCommunity";
import { useRouteLoaderDataOrFail } from "../../../utils/loaderDataUtils";
import { AppRoutes } from "../../AppRoutes";
import { CritterForm } from "../../CritterForm/CritterForm";
import { useCritterForm } from "../../CritterForm/useCritterForm";
import { AppAlert } from "../../SequentialSnackbar/AppAlert";
import { useSnackbar } from "../../SequentialSnackbar/SequentialSnackbarContext";
import { useRouteSpeciesOrFail } from "../useRouteSpecies";

export interface EditCritterCardProps {}
export const EditCritterCard: FC = () => {
  const community = useRouteCommunityOrFail();
  const critter = useRouteLoaderDataOrFail("root.community.species.critter");
  usePageTitle(`${community.name} - Edit ${critter.name}`);
  const fetcher =
    useFetcher<ActionData<RouteType<"root.community.species.critter">>>();
  const species = useRouteSpeciesOrFail();
  const [form, dispatch] = useCritterForm(critter);

  const snackbar = useSnackbar();
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (isCritter(fetcher.data)) {
        snackbar.append({
          children: (
            <AppAlert
              severity="success"
              text="Critter Modified!"
              snackbarQueue={snackbar}
              actionLink={{
                to: AppRoutes.speciesDetail(community.id, species.id),
                text: "Return to species",
              }}
            />
          ),
        });
      } else {
        if (isBaseError(fetcher.data)) {
          snackbar.appendSimpleError(
            (fetcher.data.message || fetcher.data.__typename) ?? "Unknown error"
          );
        }
      }
    }
  }, [fetcher.data, fetcher.state]);
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
          submitButtonText="Save"
        />
      </CardContent>
    </Card>
  );
};

export const ConnectedEditCritterCard = EditCritterCard;
