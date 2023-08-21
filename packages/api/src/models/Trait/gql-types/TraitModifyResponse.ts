import { createUnionType } from "type-graphql";
import { NotAuthorizedError } from "../../../business/auth/NotAuthorizedError.js";
import { DuplicateError } from "../../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError.js";
import { Trait } from "../Trait.js";

export const TraitModifyResponse = createUnionType({
  name: "TraitModifyResponse",
  types: () => [
    Trait,
    DuplicateError,
    InvalidArgumentError,
    NotAuthorizedError,
  ],
});
