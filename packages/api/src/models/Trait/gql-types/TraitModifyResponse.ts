import { createUnionType } from "type-graphql";
import { NotAuthenticatedError } from "../../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../../business/auth/NotAuthorizedError.js";
import { DuplicateError } from "../../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../../errors/NotFoundError.js";
import { Trait } from "../Trait.js";

export const TraitModifyResponse = createUnionType({
  name: "TraitModifyResponse",
  types: () => [
    Trait,
    DuplicateError,
    InvalidArgumentError,
    NotAuthenticatedError,
    NotAuthorizedError,
    NotFoundError,
  ],
});
