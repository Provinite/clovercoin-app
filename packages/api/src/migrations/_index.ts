import { initializeDb1690172455074 } from "./1690172455074-initialize-db.js";
import { ChangeCritterTraitsToJsonb1690779921209 } from "./1690779921209-change-critter-traits-to-jsonb.js";
import { AddCritterTraitValuesGinIndex1691043318922 } from "./1691043318922-add-critter-trait-values-gin-index.js";
import { AddInviteCodes1691795618473 } from "./1691795618473-add-invite-codes.js";
import { AddInviteCodeCheckConstraint1691808450017 } from "./1691808450017-add-invite-code-check-constraint.js";
import { AddResetTokenTable1691898872701 } from "./1691898872701-add-reset-token-table.js";

export const migrationsArray = [
  initializeDb1690172455074,
  ChangeCritterTraitsToJsonb1690779921209,
  AddCritterTraitValuesGinIndex1691043318922,
  AddInviteCodes1691795618473,
  AddInviteCodeCheckConstraint1691808450017,
  AddResetTokenTable1691898872701,
];
