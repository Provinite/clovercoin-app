import { createUnionType } from "type-graphql";
import { NotAuthenticatedError } from "../../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../../business/auth/NotAuthorizedError.js";
import { NotFoundError } from "../../../errors/NotFoundError.js";
import { TraitList } from "./TraitList.js";

export const TraitListResponse = createUnionType({
  name: "TraitListResponse",
  types: () => [
    TraitList,
    NotFoundError,
    NotAuthorizedError,
    NotAuthenticatedError,
  ],
});
