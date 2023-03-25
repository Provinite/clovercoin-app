import { Account } from "./Account/Account";
import { Community } from "./Community/Community";
import { CommunityMember } from "./CommunityMember/CommunityMember";
import { Critter } from "./Critter/Critter";
import { CritterOwnershipChange } from "./CritterOwnershipChange/CritterOwnershipChange";
import { EnumValue } from "./EnumValue/EnumValue";
import { EnumValueSetting } from "./EnumValueSetting/EnumValueSetting";
import { Identity } from "./Identity/Identity";
import { Species } from "./Species/Species";
import { Trait } from "./Trait/Trait";
import { TraitList } from "./TraitList/TraitList";
import { TraitListEntry } from "./TraitListEntry/TraitListEntry";

/**
 * Model classes mapped by their name.
 */
const modelsByName = {
  Account,

  Community,
  CommunityMember,

  Critter,
  CritterOwnershipChange,

  EnumValue,
  EnumValueSetting,

  Identity,

  Species,

  Trait,
  TraitList,
  TraitListEntry,
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
