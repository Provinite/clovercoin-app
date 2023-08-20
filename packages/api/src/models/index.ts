import { Account } from "./Account/Account.js";
import { Community } from "./Community/Community.js";
import { CommunityMember } from "./CommunityMember/CommunityMember.js";
import { Critter } from "./Critter/Critter.js";
import { CritterOwnershipChange } from "./CritterOwnershipChange/CritterOwnershipChange.js";
import { EnumValue } from "./EnumValue/EnumValue.js";
import { EnumValueSetting } from "./EnumValueSetting/EnumValueSetting.js";
import { Identity } from "./Identity/Identity.js";
import { InviteCode } from "./InviteCode/InviteCode.js";
import { ResetToken } from "./ResetToken/ResetToken.js";
import { Species } from "./Species/Species.js";
import { Trait } from "./Trait/Trait.js";
import { Variant } from "./TraitList/TraitList.js";
import { TraitListEntry } from "./TraitListEntry/TraitListEntry.js";

/**
 * Model classes mapped by their name.
 */
const modelsByName = {
  Account,
  ResetToken,

  Community,
  CommunityMember,

  Critter,
  CritterOwnershipChange,

  EnumValue,
  EnumValueSetting,

  Identity,

  Species,

  Trait,
  TraitList: Variant,
  TraitListEntry,

  InviteCode,
};

// ALl of these types flow from the above object

export type ModelClassByName = typeof modelsByName;
export type ModelClassName = keyof ModelClassByName;
export type ModelClass = ModelClassByName[ModelClassName];
export type ModelByName = {
  [key in ModelClassName]: InstanceType<ModelClassByName[key]>;
};

export const ModelsArray: ModelClass[] = Object.values(modelsByName);
export const ModelsMap = modelsByName;
