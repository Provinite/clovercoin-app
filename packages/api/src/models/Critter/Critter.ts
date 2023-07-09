import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm/index.js";
import { Species } from "../Species/Species.js";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";
import { Identity } from "../Identity/Identity.js";
import { TraitList } from "../TraitList/TraitList.js";

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

  @Column("jsonb", { default: [], array: true, nullable: false })
  @Field(() => [String], { nullable: false })
  traitValues!: string[];
}

export type CritterRequiredFieldKeys = "speciesId";
export interface CritterRequiredFields
  extends Pick<Critter, CritterRequiredFieldKeys> {}
