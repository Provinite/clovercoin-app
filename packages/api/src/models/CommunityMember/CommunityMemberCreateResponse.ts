import { createUnionType } from "type-graphql";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { CommunityMember } from "./CommunityMember.js";
import { InvitationRequiredError } from "./InvitationRequiredError.js";

export const CommunityMemberCreateResponse = createUnionType({
  name: "CommunityMemberCreateResponse",
  types: () => [
    CommunityMember,
    InvitationRequiredError,
    InvalidArgumentError,
    DuplicateError,
    NotFoundError,
    NotAuthorizedError,
    NotAuthenticatedError,
  ],
});
