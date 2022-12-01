import { FunctionComponent, useCallback, useMemo } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { CritterTraitValueType } from "@clovercoin/api-client";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { slugToUuid } from "../../../utils/uuidUtils";
import { AppRoutes } from "../../AppRoutes";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { useRouteSpecies } from "../useRouteSpecies";
import {
  SequentialSnackbar,
  useSnackbarQueue,
} from "../../SequentialSnackbar/SequentialSnackbar";
import { TraitForm } from "./TraitForm/TraitForm";
import { useTraitForm } from "./TraitForm/useTraitForm";
import { TraitPreviewCard } from "./TraitPreviewCard";
import { TraitActionAlert } from "./TraitActionAlert";
/**
 * Card component that allows adding and editing traits. Add/edit
 * mode are controlled by the current route.
 * @returns
 */
export const AddTraitCard: FunctionComponent = () => {
  const community = useRouteCommunity();
  const species = useRouteSpecies();
  const fetcher = useFetcher();
  const [form, setForm] = useTraitForm();
  const { traitId: traitSlug } = useParams();
  const traitId = useMemo(
    () => (traitSlug ? slugToUuid(traitSlug!) : ""),
    [traitSlug]
  );

  const onSuccess = useCallback(() => {
    setForm({
      enumValues: [],
      name: "",
      valueType: CritterTraitValueType.String,
      id: traitId,
    });

    snackbarQueue.append({
      children: (
        <TraitActionAlert
          linkTo={AppRoutes.speciesTraitList(community.id, species.id)}
          onClose={snackbarQueue.close}
        />
      ),
    });
  }, []);

  const snackbarQueue = useSnackbarQueue();
  const gridSizes = {
    xs: 6,
    lg: 4,
    xl: 3,
  };

  return (
    <>
      <SequentialSnackbar queue={snackbarQueue} />
      <CardHeader
        title="Add"
        subheader="Create traits here, and add them to trait lists later"
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item {...gridSizes}>
            <Card elevation={2}>
              <CardHeader title="Options" subheader="Set up your trait" />
              <CardContent>
                <TraitForm
                  action={AppRoutes.speciesTraitList(community.id, species.id)}
                  fetcher={fetcher}
                  form={form}
                  setForm={setForm}
                  method="post"
                  onSuccess={onSuccess}
                  saveButtonText="Save"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item {...gridSizes}>
            <TraitPreviewCard form={form} />
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};
