import { Connection, Repository } from "typeorm";
import { Critter } from "../models/Critter/Critter";
import { CritterTrait } from "../models/CritterTrait/CritterTrait";
import { Species } from "../models/Species/Species";
import { SpeciesTrait } from "../models/SpeciesTrait/SpeciesTrait";
import { Trait } from "../models/Trait/Trait";

export type AppGraphqlContext = {
  db: Connection;
  critterRepository: Repository<Critter>;
  speciesRepository: Repository<Species>;
  critterTraitRepository: Repository<CritterTrait>;
  traitRepository: Repository<Trait>;
  speciesTraitRepository: Repository<SpeciesTrait>;
};
