import { useParams } from "react-router-dom";
import { slugToUuid } from "../../utils/uuidUtils";
import { useRouteSpecies } from "./useRouteSpecies";

/**
 * Retrive the variant specified in the route. Relies
 * on the species detail query containing all variants.
 * @see useRouteSpecies
 */
export const useRouteVariant = () => {
  const species = useRouteSpecies();
  const { variantSlug } = useParams();
  if (!variantSlug) {
    return;
  }
  const variantId = slugToUuid(variantSlug);
  const variant = species.traitLists.find((tl) => tl.id === variantId);
  if (!variant) {
    throw new Error("Invalid variant id");
  }
  return variant;
};
