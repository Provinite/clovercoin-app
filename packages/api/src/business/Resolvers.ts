import { CommunityResolver } from "../models/Community/CommunityResolver.js";
import { CritterResolver } from "../models/Critter/CritterResolver.js";
import { EnumValueSettingResolver } from "../models/EnumValueSetting/EnumValueSettingResolver.js";
import { SpeciesResolver } from "../models/Species/SpeciesResolver.js";
import { TraitResolver } from "../models/Trait/TraitResolver.js";
import { TraitListResolver } from "../models/TraitList/TraitListResolver.js";
import { TraitListEntryResolver } from "../models/TraitListEntry/TraitListEntryResolver.js";
import { LoginResolver } from "./LoginResolver.js";

export const ResolversMap = {
  CommunityResolver,
  CritterResolver,
  LoginResolver,
  SpeciesResolver,
  TraitResolver,
  TraitListResolver,
  TraitListEntryResolver,
  EnumValueSettingResolver,
};

export const ResolversArray = Object.values(ResolversMap);
