import { registerEnumType } from "type-graphql";

export enum CritterTraitValueTypes {
  String = "string",
  Timestamp = "timestamp",
  Integer = "integer",
  Enum = "enum",
}

registerEnumType(CritterTraitValueTypes, {
  name: "CritterTraitValueType",
  description: "Critter trait value types",
});
