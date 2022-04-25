import { CommunityResolver } from "../models/Community/CommunityResolver";
import { CritterResolver } from "../models/Critter/CritterResolver";
import { CritterTraitResolver } from "../models/CritterTrait/CritterTraitResolver";
import { SpeciesResolver } from "../models/Species/SpeciesResolver";
import { TraitResolver } from "../models/Trait/TraitResolver";
import { TraitListResolver } from "../models/TraitList/TraitListResolver";
import { LoginResolver } from "./LoginResolver";

export const ResolversMap = {
  CommunityResolver,
  CritterResolver,
  CritterTraitResolver,
  LoginResolver,
  SpeciesResolver,
  TraitResolver,
  TraitListResolver,
};

export const ResolversArray = Object.values(ResolversMap);
