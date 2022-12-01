import { CritterTraitValueType } from "@clovercoin/api-client";

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
