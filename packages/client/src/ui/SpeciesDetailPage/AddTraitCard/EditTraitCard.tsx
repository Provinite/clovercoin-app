import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFetcher, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { slugToUuid } from "../../../utils/uuidUtils";
import { AppRoutes } from "../../AppRoutes";
import { useRouteCommunityOrFail } from "../../../useRouteCommunity";
import { useRouteSpeciesOrFail } from "../useRouteSpecies";
import { TraitForm } from "./TraitForm/TraitForm";
import { useTraitForm } from "./TraitForm/useTraitForm";
import { TraitPreviewCard } from "./TraitPreviewCard";
import { useRouteTraitsOrFail } from "../useRouteTraits";
import { useSnackbar } from "../../SequentialSnackbar/SequentialSnackbarContext";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { AppAlert } from "../../SequentialSnackbar/AppAlert";

/**
 * Card component that allows adding and editing traits. Add/edit
 * mode are controlled by the current route.
 * @returns
 */
export const EditTraitCard: FunctionComponent = () => {
  const community = useRouteCommunityOrFail();
  const species = useRouteSpeciesOrFail();

  const [form, setForm] = useTraitForm();
  const fetcher = useFetcher();

  const traits = useRouteTraitsOrFail();
  const { traitId: traitSlug } = useParams();

  const snackbarQueue = useSnackbar();

  const [pageTitle, setPageTitle] = useState(
    `${community.name} - Edit ${species.name} Trait`
  );
  usePageTitle(pageTitle);

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
      setPageTitle(
        `${community.name} - ${species.name} - Modify ${existingTrait.name}`
      );
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
        <AppAlert
          severity="success"
          text="Trait Saved"
          snackbarQueue={snackbarQueue}
          actionLink={{
            to: AppRoutes.speciesTraitList(community.id, species.id),
            text: "Return to list",
          }}
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
                        <AppAlert
                          snackbarQueue={snackbarQueue}
                          severity="error"
                          text={`${err.__typename}: ${err.message}`}
                        />
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
