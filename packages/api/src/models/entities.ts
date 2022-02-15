import { Critter } from "./Critter/Critter";
import { CritterTrait } from "./CritterTrait/CritterTrait";
import { Species } from "./Species/Species";
import { SpeciesTrait } from "./SpeciesTrait/SpeciesTrait";
import { Trait } from "./Trait/Trait";

export const entities = [
  Critter,
  CritterTrait,
  Trait,
  Species,
  SpeciesTrait,
] as const;
