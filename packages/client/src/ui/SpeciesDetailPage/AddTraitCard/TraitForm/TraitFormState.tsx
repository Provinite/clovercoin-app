import { CritterTraitValueType } from "../../../../generated/graphql";

export interface TraitFormState {
  id?: string;
  name: string;
  enumValues: {
    id?: string;
    name: string;
    localId?: string;
  }[];
  valueType: CritterTraitValueType;
}
