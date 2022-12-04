import { useParams } from "react-router-dom";
import { slugToUuid } from "../../utils/uuidUtils";
import { useRouteSpecies } from "./useRouteSpecies";

/**
 * Retrive the variant specified in the route. Relies
 * on the species detail query containing all variants.
 * @see useRouteSpecies
 */
export const useRouteTraitList = () => {
  const species = useRouteSpecies();
  const { traitListId: traitListSlug } = useParams();
  if (!traitListSlug) {
    throw new Error("Invalid trait list id");
  }
  const traitUuid = slugToUuid(traitListSlug);
  const traitList = species.traitLists.find((tl) => tl.id === traitUuid);
  if (!traitList) {
    throw new Error("Invalid trait list id");
  }
  return traitList;
};