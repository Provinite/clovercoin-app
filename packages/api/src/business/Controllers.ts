import { AccountController } from "../models/Account/AccountController.js";
import { CommunityController } from "../models/Community/CommunityController.js";
import { CommunityMemberController } from "../models/CommunityMember/CommunityMemberController.js";
import { CritterController } from "../models/Critter/CritterController.js";
import { CritterOwnershipChangeController } from "../models/CritterOwnershipChange/CritterOwnershipChangeController.js";
import { EnumValueController } from "../models/EnumValue/EnumValueController.js";
import { EnumValueSettingController } from "../models/EnumValueSetting/EnumValueSettingController.js";
import { IdentityController } from "../models/Identity/IdentityController.js";
import { SpeciesController } from "../models/Species/SpeciesController.js";
import { TraitController } from "../models/Trait/TraitController.js";
import { SpeciesVariantController } from "../models/SpeciesVariant/SpeciesVariantController.js";
import { TraitListEntryController } from "../models/TraitListEntry/TraitListEntryController.js";
import { LoginController } from "./LoginController.js";
import { InviteCodeController } from "../models/InviteCode/InviteCodeController.js";
import { ResetTokenController } from "../models/ResetToken/ResetTokenController.js";
import { RoleController } from "../models/Role/RoleController.js";
import { CommunityInvitationController } from "../models/CommunityInvitation/CommunityInvitationController.js";
/**
 * Add controllers here when they are created to make them available
 * via graphql context etc. Handles typing as well.
 */
export const ControllersMap = {
  AccountController,
  ResetTokenController,

  CommunityController,
  CommunityMemberController,

  CritterController,
  CritterOwnershipChangeController,

  EnumValueController,
  EnumValueSettingController,

  IdentityController,
  LoginController,

  SpeciesController,

  TraitController,
  SpeciesVariantController,
  TraitListEntryController,

  InviteCodeController,
  RoleController,

  CommunityInvitationController,
} as const;

export type ControllersMap = typeof ControllersMap;
export type ControllerName = keyof ControllersMap;
export type ControllerClass = ControllersMap[ControllerName];

export const ControllersArray: ControllerClass[] =
  Object.values(ControllersMap);
