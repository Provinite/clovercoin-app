import { AccountController } from "../models/Account/AccountController";
import { CommunityController } from "../models/Community/CommunityController";
import { EnumValueController } from "../models/EnumValue/EnumValueController";
import { IdentityController } from "../models/Identity/IdentityController";
import { SpeciesController } from "../models/Species/SpeciesController";
import { TraitController } from "../models/Trait/TraitController";
import { TraitListController } from "../models/TraitList/TraitListController";
import { LoginController } from "./LoginController";

export const ControllersMap = {
  AccountController,
  CommunityController,
  EnumValueController,
  IdentityController,
  LoginController,
  SpeciesController,
  TraitController,
  TraitListController,
} as const;

export type ControllersMap = typeof ControllersMap;
export type ControllerName = keyof ControllersMap;
export type ControllerClass = ControllersMap[ControllerName];

export const ControllersArray: ControllerClass[] =
  Object.values(ControllersMap);
