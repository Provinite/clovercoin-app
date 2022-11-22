import { useParams } from "react-router-dom";
import { useRouteSpecies } from "./useRouteSpecies";

export const useRouteTraitList = () => {
  const species = useRouteSpecies();
  const { traitListId } = useParams();
  const traitList = species.traitLists.find((tl) => tl.id === traitListId);
  if (!traitList) {
    throw new Error("Invalid trait list id");
  }
  return traitList;
};
