import { createUnionType } from "type-graphql";
import { NotAuthorizedError } from "../../../business/auth/NotAuthorizedError.js";
import { DeleteResponse } from "../../../business/DeleteResponse.js";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError.js";

export const TraitDeleteResponse = createUnionType({
  name: "TraitDeleteResponse",
  types: () => [DeleteResponse, NotAuthorizedError, InvalidArgumentError],
});
