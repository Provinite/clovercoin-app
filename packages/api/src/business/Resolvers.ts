import { CommunityResolver } from "../models/Community/CommunityResolver";
import { CritterResolver } from "../models/Critter/CritterResolver";
import { CritterTraitResolver } from "../models/CritterTrait/CritterTraitResolver";
import { SpeciesResolver } from "../models/Species/SpeciesResolver";
import { TraitResolver } from "../models/Trait/TraitResolver";
import { TraitListResolver } from "../models/TraitList/TraitListResolver";
import { TraitListEntryResolver } from "../models/TraitListEntry/TraitListEntryResolver";
import { LoginResolver } from "./LoginResolver";

export const ResolversMap = {
  CommunityResolver,
  CritterResolver,
  CritterTraitResolver,
  LoginResolver,
  SpeciesResolver,
  TraitResolver,
  TraitListResolver,
  TraitListEntryResolver,
};

export const ResolversArray = Object.values(ResolversMap);
