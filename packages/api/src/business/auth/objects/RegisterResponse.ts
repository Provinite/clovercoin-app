import { createUnionType } from "type-graphql";
import { DuplicateError } from "../../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError.js";
import { LoginSuccessResponse } from "./LoginSuccessResponse.js";

export const RegisterResponse = createUnionType({
  name: "RegisterResponse",
  types: () => [LoginSuccessResponse, InvalidArgumentError, DuplicateError],
});
