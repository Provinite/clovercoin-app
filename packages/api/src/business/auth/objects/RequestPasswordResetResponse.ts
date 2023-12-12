import { createUnionType } from "type-graphql";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError.js";
import { RequestPasswordResetReceivedResponse } from "./RequestPasswordResetReceivedResponse.js";

export const RequestPasswordResetResponse = createUnionType({
  name: "RequestPasswordResetResponse",
  types: () => [RequestPasswordResetReceivedResponse, InvalidArgumentError],
});
