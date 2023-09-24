import { createUnionType } from "type-graphql";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { Identity } from "./Identity.js";

export const IdentityModifyResponse = createUnionType({
  name: "IdentityModifyResponse",
  types: () => [
    Identity,
    NotAuthenticatedError,
    NotAuthorizedError,
    InvalidArgumentError,
    NotFoundError,
  ],
});
