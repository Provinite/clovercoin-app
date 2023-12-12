import { createUnionType } from "type-graphql";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError.js";
import { LoginSuccessResponse } from "./LoginSuccessResponse.js";
import { LoginFailureResponse } from "./LoginFailureResponse.js";

/**
 * Response type for login mutations. May be a success,
 * failure, or validation error.
 */
export const LoginResponse = createUnionType({
  name: "LoginResponse",
  types: () => [
    LoginSuccessResponse,
    LoginFailureResponse,
    InvalidArgumentError,
  ],
});
