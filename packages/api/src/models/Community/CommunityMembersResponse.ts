import { createUnionType } from "type-graphql";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { IdentityList } from "../Identity/IdentityList.js";

export const CommunityMembersResponse = createUnionType({
  name: "CommunityMembersResponse",
  types: () => [IdentityList, NotAuthorizedError],
});
