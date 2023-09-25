/**
 * @file This file collects all resolvers used in the app.
 */
import { CommunityResolver } from "../models/Community/CommunityResolver.js";
import { CritterResolver } from "../models/Critter/CritterResolver.js";
import { EnumValueSettingResolver } from "../models/EnumValueSetting/EnumValueSettingResolver.js";
import { IdentityResolver } from "../models/Identity/IdentityResolver.js";
import { InviteCodeResolver } from "../models/InviteCode/InviteCodeResolver.js";
import { SpeciesResolver } from "../models/Species/SpeciesResolver.js";
import { TraitResolver } from "../models/Trait/TraitResolver.js";
import { SpeciesVariantResolver } from "../models/SpeciesVariant/SpeciesVariantResolver.js";
import { TraitListEntryResolver } from "../models/TraitListEntry/TraitListEntryResolver.js";
import { LoginResolver } from "./LoginResolver.js";
import { RoleResolver } from "../models/Role/RoleResolver.js";
import { CommunityInvitationResolver } from "../models/CommunityInvitation/CommunityInvitationResolver.js";
import { CommunityMemberResolver } from "../models/CommunityMember/CommunityMemberResolver.js";
/**
 * This map contains all resolvers by their classnames. If you create a new resolver,
 * it must be added here to have its queries and mutations in the gql schema.
 */
export const ResolversMap = {
  CommunityResolver,
  CritterResolver,
  LoginResolver,
  SpeciesResolver,
  TraitResolver,
  SpeciesVariantResolver,
  TraitListEntryResolver,
  EnumValueSettingResolver,
  IdentityResolver,
  InviteCodeResolver,
  RoleResolver,
  CommunityInvitationResolver,
  CommunityMemberResolver,
};

export const ResolversArray = Object.values(ResolversMap);
