import { initializeDb1690172455074 } from "./1690172455074-initialize-db.js";
import { ChangeCritterTraitsToJsonb1690779921209 } from "./1690779921209-change-critter-traits-to-jsonb.js";
import { AddCritterTraitValuesGinIndex1691043318922 } from "./1691043318922-add-critter-trait-values-gin-index.js";
import { AddInviteCodes1691795618473 } from "./1691795618473-add-invite-codes.js";
import { AddInviteCodeCheckConstraint1691808450017 } from "./1691808450017-add-invite-code-check-constraint.js";
import { AddResetTokensTable1691912368093 } from "./1691912368093-add-reset-tokens-table.js";
import { RenameTraitListsTable1692510423335 } from "./1692510423335-rename-trait-lists-table.js";
import { RemoveErroneousVariantUqIndex1692551564666 } from "./1692551564666-remove-erroneous-variant-uq-index.js";
import { RenameCritterTraitListIdColumn1692560972528 } from "./1692560972528-rename-critter-trait-list-id-column.js";

export const migrationsArray = [
  initializeDb1690172455074,
  ChangeCritterTraitsToJsonb1690779921209,
  AddCritterTraitValuesGinIndex1691043318922,
  AddInviteCodes1691795618473,
  AddInviteCodeCheckConstraint1691808450017,
  AddResetTokensTable1691912368093,
  RenameTraitListsTable1692510423335,
  RemoveErroneousVariantUqIndex1692551564666,
  RenameCritterTraitListIdColumn1692560972528,
];
