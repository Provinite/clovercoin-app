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
import { IsEmpty, IsString, IsUUID } from "class-validator";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

@Entity()
@ObjectType()
@Index("critter_traitvalues_gin_idx", { synchronize: false })
export class Critter {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  @IsString({ groups: [...ValidationGroupAll] })
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
  @IsUUID(4, { groups: [...ValidationGroupAll] })
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
  @IsUUID(4, { groups: [...ValidationGroupAll] })
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
  @IsUUID(4, { groups: [...ValidationGroupAll] })
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
