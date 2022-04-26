import { AccountController } from "../models/Account/AccountController";
import { CommunityController } from "../models/Community/CommunityController";
import { CommunityMemberController } from "../models/CommunityMember/CommunityMemberController";
import { CritterController } from "../models/Critter/CritterController";
import { CritterOwnershipChangeController } from "../models/CritterOwnershipChange/CritterOwnershipChangeController";
import { CritterTraitController } from "../models/CritterTrait/CritterTraitController";
import { EnumValueController } from "../models/EnumValue/EnumValueController";
import { EnumValueSettingController } from "../models/EnumValueSetting/EnumValueSettingController";
import { IdentityController } from "../models/Identity/IdentityController";
import { SpeciesController } from "../models/Species/SpeciesController";
import { TraitController } from "../models/Trait/TraitController";
import { TraitListController } from "../models/TraitList/TraitListController";
import { TraitListEntryController } from "../models/TraitListEntry/TraitListEntryController";
import { LoginController } from "./LoginController";

export const ControllersMap = {
  AccountController,

  CommunityController,
  CommunityMemberController,

  CritterController,
  CritterTraitController,
  CritterOwnershipChangeController,

  EnumValueController,
  EnumValueSettingController,

  IdentityController,
  LoginController,

  SpeciesController,

  TraitController,
  TraitListController,
  TraitListEntryController,
} as const;

export type ControllersMap = typeof ControllersMap;
export type ControllerName = keyof ControllersMap;
export type ControllerClass = ControllersMap[ControllerName];

export const ControllersArray: ControllerClass[] =
  Object.values(ControllersMap);
