import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Species } from "../Species/Species.js";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";
import { Identity } from "../Identity/Identity.js";
import { TraitList } from "../TraitList/TraitList.js";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes.js";

@Entity()
@ObjectType()
export class Critter {
  @IdField
  id: string | undefined;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  name: string = "";

  @ManyToOneField({
    columnName: "speciesId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Species,
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

  @ManyToOneField({
    columnName: "traitListId",
    foreignColumnName: "id",
    nullable: false,
    type: () => TraitList,
  })
  traitList!: TraitList;

  @RelationIdField<Critter>({
    nullable: false,
    relation: (critter) => critter.traitList,
  })
  traitListId!: string;

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

  @Field(() => CritterTraitValueTypes, { nullable: false })
  dataType!: CritterTraitValueTypes;
}

export type CritterRequiredFieldKeys = "speciesId";
export interface CritterRequiredFields
  extends Pick<Critter, CritterRequiredFieldKeys> {}
