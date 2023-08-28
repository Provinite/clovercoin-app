import { CommunityAuthorizer } from "../../models/Community/CommunityAuthorizer.js";
import { CritterAuthorizer } from "../../models/Critter/CritterAuthorizer.js";
import { GlobalAuthorizer } from "./GlobalAuthorizer.js";

export const Authorizers = {
  CritterAuthorizer,
  CommunityAuthorizer,
  GlobalAuthorizer,
} as const;
