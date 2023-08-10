import { initializeDb1690172455074 } from "./1690172455074-initialize-db.js";
import { ChangeCritterTraitsToJsonb1690779921209 } from "./1690779921209-change-critter-traits-to-jsonb.js";
import { AddCritterTraitValuesGinIndex1691043318922 } from "./1691043318922-add-critter-trait-values-gin-index.js";

export const migrationsArray = [
  initializeDb1690172455074,
  ChangeCritterTraitsToJsonb1690779921209,
  AddCritterTraitValuesGinIndex1691043318922,
];
