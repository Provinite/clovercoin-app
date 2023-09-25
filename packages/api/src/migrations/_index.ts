import { initializeDb1690172455074 } from "./1690172455074-initialize-db.js";
import { ChangeCritterTraitsToJsonb1690779921209 } from "./1690779921209-change-critter-traits-to-jsonb.js";
import { AddCritterTraitValuesGinIndex1691043318922 } from "./1691043318922-add-critter-trait-values-gin-index.js";
import { AddInviteCodes1691795618473 } from "./1691795618473-add-invite-codes.js";
import { AddInviteCodeCheckConstraint1691808450017 } from "./1691808450017-add-invite-code-check-constraint.js";
import { AddResetTokensTable1691912368093 } from "./1691912368093-add-reset-tokens-table.js";
import { RenameTraitListsTable1692510423335 } from "./1692510423335-rename-trait-lists-table.js";
import { RemoveErroneousVariantUqIndex1692551564666 } from "./1692551564666-remove-erroneous-variant-uq-index.js";
import { RenameCritterTraitListIdColumn1692560972528 } from "./1692560972528-rename-critter-trait-list-id-column.js";
import { RenameEnumValueSettingTraitListFields1692573382888 } from "./1692573382888-rename-enum-value-setting-trait-list-fields.js";
import { RenameTraitListEntryTraitListIdField1692581217285 } from "./1692581217285-rename-trait-list-entry-trait-list-id-field.js";
import { AddRoles1692753280259 } from "./1692753280259-add-roles.js";
import { AddIdentityCanCreateCommunityColumn1692845317726 } from "./1692845317726-add-identity-can-create-community-column.js";
import { AddCanListIdentitiesPerm1693092216811 } from "./1693092216811-add-can-list-identities-perm.js";
import { AddIdentityCanCreateInviteCodePerm1693180926946 } from "./1693180926946-add-identity-can-create-invite-code-perm.js";
import { AddInviteCodeRoleid1693851679207 } from "./1693851679207-add-invite-code-roleid.js";
import { AddCommunityInvitationTable1694991481498 } from "./1694991481498-add-community-invitation-table.js";
import { AddUniqueIndexesToInviteAndCommunityMember1695020560381 } from "./1695020560381-add-unique-indexes-to-invite-and-community-member.js";
import { AddIdentityCanGrantGlobalPermissionsField1695513359643 } from "./1695513359643-add-identity-can-grant-global-permissions-field.js";

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
  RenameEnumValueSettingTraitListFields1692573382888,
  RenameTraitListEntryTraitListIdField1692581217285,
  AddRoles1692753280259,
  AddIdentityCanCreateCommunityColumn1692845317726,
  AddCanListIdentitiesPerm1693092216811,
  AddIdentityCanCreateInviteCodePerm1693180926946,
  AddInviteCodeRoleid1693851679207,
  AddCommunityInvitationTable1694991481498,
  AddUniqueIndexesToInviteAndCommunityMember1695020560381,
  AddIdentityCanGrantGlobalPermissionsField1695513359643,
];
