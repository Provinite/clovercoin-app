import { initializeDb1690172455074 } from "./1690172455074-initialize-db.js";
import { ChangeCritterTraitsToJsonb1690779921209 } from "./1690779921209-change-critter-traits-to-jsonb.js";

export const migrationsArray = [
  initializeDb1690172455074,
  ChangeCritterTraitsToJsonb1690779921209,
];
