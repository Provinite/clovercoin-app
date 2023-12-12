import { createUnionType } from "type-graphql";
import { NotAuthenticatedError } from "../../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../../business/auth/NotAuthorizedError.js";
import { DeleteResponse } from "../../../business/DeleteResponse.js";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../../errors/NotFoundError.js";

export const TraitDeleteResponse = createUnionType({
  name: "TraitDeleteResponse",
  types: () => [
    DeleteResponse,
    InvalidArgumentError,
    NotAuthenticatedError,
    NotAuthorizedError,
    NotFoundError,
  ],
});
