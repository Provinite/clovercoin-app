import { createUnionType } from "type-graphql";
import { CritterTrait } from "./CritterTrait";
import { CritterTraitValueTypes } from "./CritterTraitValueTypes";
import {
  CritterEnumTrait,
  CritterIntTrait,
  CritterStringTrait,
  CritterTimestampTrait,
} from "./CritterTraitObjectTypes";

export const CritterTraitUnionType = createUnionType({
  name: "CritterTraitUnion",
  types: () =>
    [CritterIntTrait, CritterStringTrait, CritterTimestampTrait] as const,
  resolveType: (val: CritterTrait) => {
    return {
      [CritterTraitValueTypes.Integer]: CritterIntTrait,
      [CritterTraitValueTypes.String]: CritterStringTrait,
      [CritterTraitValueTypes.Timestamp]: CritterTimestampTrait,
      [CritterTraitValueTypes.Enum]: CritterEnumTrait,
    }[val.valueType];
  },
});
