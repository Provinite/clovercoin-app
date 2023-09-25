import { createUnionType } from "type-graphql";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { CommunityInvitation } from "./CommunityInvitation.js";
import { UserAlreadyHasRoleError } from "./UserAlreadyHasRoleError.js";

export const CommunityInvitationCreateResponse = createUnionType({
  name: "CommunityInvitationCreateResponse",
  types: () => [
    CommunityInvitation,
    NotAuthorizedError,
    NotAuthenticatedError,
    InvalidArgumentError,
    NotFoundError,
    DuplicateError,
    UserAlreadyHasRoleError,
  ],
});
