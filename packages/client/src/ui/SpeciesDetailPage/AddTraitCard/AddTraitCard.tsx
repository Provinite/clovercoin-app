import { FunctionComponent, useCallback, useMemo } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { CritterTraitValueType } from "@clovercoin/api-client";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { slugToUuid } from "../../../utils/uuidUtils";
import { AppRoutes } from "../../AppRoutes";
import { useRouteCommunityOrFail } from "../../../useRouteCommunity";
import { useRouteSpeciesOrFail } from "../useRouteSpecies";
import { TraitForm, TraitFormProps } from "./TraitForm/TraitForm";
import { useTraitForm } from "./TraitForm/useTraitForm";
import { TraitPreviewCard } from "./TraitPreviewCard";
import { TraitActionAlert } from "./TraitActionAlert";
import { useSnackbar } from "../../SequentialSnackbar/SequentialSnackbarContext";
import { usePageTitle } from "../../../hooks/usePageTitle";
/**
 * Card component that allows adding and editing traits. Add/edit
 * mode are controlled by the current route.
 * @returns
 */
export const AddTraitCard: FunctionComponent = () => {
  const community = useRouteCommunityOrFail();
  const species = useRouteSpeciesOrFail();
  const fetcher = useFetcher();
  usePageTitle(`${community.name} - ${species.name} - Add Trait`);
  const [form, setForm] = useTraitForm();
  const { traitId: traitSlug } = useParams();
  const snackbarQueue = useSnackbar();

  /**
   * Trait ID to edit (if editing)
   */
  const traitId = useMemo(
    () => (traitSlug ? slugToUuid(traitSlug) : ""),
    [traitSlug]
  );

  /**
   * Callback invoked after successfully saving a new trait
   */
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

  /**
   * Callback when trait creation fails
   */
  const onError = useCallback<TraitFormProps["onError"]>(
    (err) => {
      snackbarQueue.appendSimpleError(`Failed to create trait: ${err.message}`);
    },
    [snackbarQueue]
  );

  const gridSizes = {
    xs: 6,
    lg: 4,
    xl: 3,
  };

  return (
    <>
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
                  onError={onError}
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
