import { createUnionType } from "type-graphql";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError.js";
import { ResetPasswordSuccessResponse } from "./ResetPasswordSuccessResponse.js";

export const ResetPasswordResponse = createUnionType({
  name: "ResetPasswordResponse",
  types: () => [ResetPasswordSuccessResponse, InvalidArgumentError],
});
