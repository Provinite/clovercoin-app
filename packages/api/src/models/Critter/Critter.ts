import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index } from "typeorm";
import { Species } from "../Species/Species.js";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";
import { Identity } from "../Identity/Identity.js";
import { SpeciesVariant } from "../SpeciesVariant/SpeciesVariant.js";
import { TypeormLoader } from "type-graphql-dataloader";

@Entity()
@ObjectType()
@Index("critter_traitvalues_gin_idx", { synchronize: false })
export class Critter {
  @IdField
  id!: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  name: string = "";

  @ManyToOneField<Species, typeof Species>({
    columnName: "speciesId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Species,
    inverseSide: (species) => species.critters,
  })
  species!: Species;

  @RelationIdField<Critter>({
    nullable: false,
    relation: (critter) => critter.species,
  })
  speciesId!: string;

  @ManyToOneField({
    columnName: "ownerId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Identity,
  })
  owner!: Identity;

  @RelationIdField<Critter>({
    nullable: false,
    relation: (critter) => critter.owner,
  })
  ownerId!: string;

  @ManyToOneField<SpeciesVariant, typeof SpeciesVariant>({
    columnName: "variantId",
    foreignColumnName: "id",
    nullable: false,
    type: () => SpeciesVariant,
    inverseSide: (speciesVariant) => speciesVariant.critters,
  })
  @TypeormLoader()
  variant!: SpeciesVariant;

  @RelationIdField<Critter>({
    nullable: false,
    relation: (critter) => critter.variant,
  })
  variantId!: string;

  @Column("jsonb", { default: [], nullable: false })
  @Field(() => [CritterTraitValue], { nullable: false })
  traitValues!: CritterTraitValue[];
}

@ObjectType()
export class CritterTraitValue {
  @Field(() => ID, { nullable: false })
  traitId!: string;

  @Field(() => String, { nullable: true })
  value!: string | boolean | number | null;
}

export type CritterRequiredFieldKeys = "speciesId";
export interface CritterRequiredFields
  extends Pick<Critter, CritterRequiredFieldKeys> {}
