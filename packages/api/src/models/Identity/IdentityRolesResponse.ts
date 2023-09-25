import { createUnionType } from "type-graphql";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { RoleList } from "../Role/RoleList.js";

export const IdentityRolesResponse = createUnionType({
  name: "IdentityRolesResponse",
  types: () => [RoleList, NotAuthorizedError, InvalidArgumentError],
});
