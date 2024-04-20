import { isBaseError, isCritter } from "@clovercoin/api-client";
import { Card, CardContent, CardHeader } from "@mui/material";
import { FC, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { ActionData, RouteType } from "../../../routes";
import { useRouteCommunityOrFail } from "../../../useRouteCommunity";
import { AppRoutes } from "../../AppRoutes";
import { CritterForm } from "../../CritterForm/CritterForm";
import { useCritterForm } from "../../CritterForm/useCritterForm";
import { AppAlert } from "../../SequentialSnackbar/AppAlert";
import { useSnackbar } from "../../SequentialSnackbar/SequentialSnackbarContext";
import { useRouteSpeciesOrFail } from "../useRouteSpecies";

export interface AddCritterCardProps {}
export const AddCritterCard: FC = () => {
  const fetcher =
    useFetcher<ActionData<RouteType<"root.community.species.add-critter">>>();
  const species = useRouteSpeciesOrFail();
  const community = useRouteCommunityOrFail();
  usePageTitle(`${community.name} - Create a ${species.name}`);
  const [form, dispatch] = useCritterForm();

  const snackbar = useSnackbar();
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (isCritter(fetcher.data)) {
        snackbar.append({
          children: (
            <AppAlert
              severity="success"
              text="Critter Created!"
              snackbarQueue={snackbar}
              actionLink={{
                to: AppRoutes.critterDetail(
                  community.id,
                  species.id,
                  fetcher.data.id
                ),
                text: "View",
              }}
            />
          ),
        });
        dispatch({
          type: "set",
          partial: {
            name: "",
            traitValues: {},
            variantId: "",
          },
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
          submitButtonText="create"
        />
      </CardContent>
    </Card>
  );
};

export const ConnectedAddCritterCard = AddCritterCard;
