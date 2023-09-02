import { FunctionComponent, useCallback, useEffect, useMemo } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { Alert, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { slugToUuid } from "../../../utils/uuidUtils";
import { AppRoutes } from "../../AppRoutes";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { useRouteSpecies } from "../useRouteSpecies";
import { TraitForm } from "./TraitForm/TraitForm";
import { useTraitForm } from "./TraitForm/useTraitForm";
import { TraitPreviewCard } from "./TraitPreviewCard";
import { TraitActionAlert } from "./TraitActionAlert";
import { useRouteTraits } from "../useRouteTraits";
import { useSnackbar } from "../../SequentialSnackbar/SequentialSnackbarContext";

/**
 * Card component that allows adding and editing traits. Add/edit
 * mode are controlled by the current route.
 * @returns
 */
export const EditTraitCard: FunctionComponent = () => {
  const community = useRouteCommunity();
  const species = useRouteSpecies();

  const [form, setForm] = useTraitForm();
  const fetcher = useFetcher();

  const traits = useRouteTraits();
  const { traitId: traitSlug } = useParams();

  const snackbarQueue = useSnackbar();

  /**
   * Current editing trait uuid
   */
  const traitId = useMemo(
    () => (traitSlug ? slugToUuid(traitSlug) : ""),
    [traitSlug]
  );

  /**
   * Sync trait id to form data
   */
  useEffect(() => {
    if (traitId) {
      const existingTrait = traits.list.find((t) => t.id === traitId);
      if (!existingTrait) {
        snackbarQueue.appendSimpleError("Trait not found");
        return;
      }
      setForm({
        id: traitId,
        enumValues: [...existingTrait.enumValues],
        name: existingTrait.name,
        valueType: existingTrait.valueType,
      });
    } else {
      setForm((f) => ({ ...f, id: traitId }));
    }
  }, [traitId, traits]);

  const onSuccess = useCallback(() => {
    snackbarQueue.append({
      children: (
        <TraitActionAlert
          linkTo={AppRoutes.speciesTraitList(community.id, species.id)}
          onClose={snackbarQueue.close}
        />
      ),
    });
  }, []);

  const gridSizes = {
    xs: 6,
    lg: 4,
    xl: 3,
  };

  return (
    <>
      <CardHeader title="Edit" subheader="Tweak trait settings here" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item {...gridSizes}>
            <Card elevation={2}>
              <CardHeader title="Options" subheader="Set up your trait" />
              <CardContent>
                <TraitForm
                  action={AppRoutes.speciesTraitDetail(
                    community.id,
                    species.id,
                    traitId
                  )}
                  fetcher={fetcher}
                  form={form}
                  setForm={setForm}
                  onError={(err) => {
                    snackbarQueue.append({
                      children: (
                        <Alert onClose={snackbarQueue.close} severity="error">
                          {err.__typename}: {err.message}
                        </Alert>
                      ),
                    });
                  }}
                  method="put"
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
