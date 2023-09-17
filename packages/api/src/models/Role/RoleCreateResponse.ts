import { createUnionType } from "type-graphql";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { Role } from "./Role.js";

export const RoleCreateResponse = createUnionType({
  name: "RoleCreateResponse",
  types: () => [
    Role,
    NotAuthenticatedError,
    NotAuthorizedError,
    DuplicateError,
    InvalidArgumentError,
  ],
});
