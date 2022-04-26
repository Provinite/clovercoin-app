import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";
import { Species } from "../Species/Species";
import { TypeormLoader } from "type-graphql-dataloader";
import { CritterTrait } from "../CritterTrait/CritterTrait";
import { CritterTraitUnionType } from "../CritterTrait/CritterTraitUnionType";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators";
import { Identity } from "../Identity/Identity";
import { TraitList } from "../TraitList/TraitList";

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

  @OneToMany(() => CritterTrait, (critterTrait) => critterTrait.critter)
  @Field(() => [CritterTraitUnionType], { nullable: false })
  @TypeormLoader()
  traits!: CritterTrait[];
}

export type CritterRequiredFieldKeys = "speciesId";
export interface CritterRequiredFields
  extends Pick<Critter, CritterRequiredFieldKeys> {}
