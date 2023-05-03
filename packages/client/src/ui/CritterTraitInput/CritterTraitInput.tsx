import { Trait, TraitListEntry } from "@clovercoin/api-client";

export interface CritterTraitInputProps {
  trait: Pick<Trait, "id" | "name" | "enumValues" | "valueType">;
  traitListEntry: Pick<TraitListEntry, "required">;
}
// export const CritterTraitInput = () => {};
