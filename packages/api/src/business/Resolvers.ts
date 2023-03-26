import { CommunityResolver } from "../models/Community/CommunityResolver";
import { CritterResolver } from "../models/Critter/CritterResolver";
import { EnumValueSettingResolver } from "../models/EnumValueSetting/EnumValueSettingResolver";
import { SpeciesResolver } from "../models/Species/SpeciesResolver";
import { TraitResolver } from "../models/Trait/TraitResolver";
import { TraitListResolver } from "../models/TraitList/TraitListResolver";
import { TraitListEntryResolver } from "../models/TraitListEntry/TraitListEntryResolver";
import { LoginResolver } from "./LoginResolver";

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
