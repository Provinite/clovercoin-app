import { createUnionType } from "type-graphql";
import { NotAuthorizedError } from "../../../business/auth/NotAuthorizedError.js";
import { TraitList } from "./TraitList.js";

export const TraitListResponse = createUnionType({
  name: "TraitListResponse",
  types: () => [TraitList, NotAuthorizedError],
});
