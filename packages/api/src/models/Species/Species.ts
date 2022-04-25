import { Field, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Community } from "../Community/Community";
import { Critter } from "../Critter/Critter";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators";
import { TraitList } from "../TraitList/TraitList";

@Entity()
@ObjectType({
  description:
    "Model representing an arbitrarily broad class of charcters that use common trait lists, and administration.",
})
export class Species {
  @IdField
  id!: string;

  @Field(() => String, { description: "Name of the species" })
  @Column({ nullable: false, unique: true })
  name: string = "";

  @ManyToOneField({
    columnName: "communityId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Community,
    description: "Community that owns this species",
  })
  community!: Community;

  @RelationIdField<Species>({
    nullable: false,
    relation: (species) => species.community,
    description: "ID of the community that owns this species",
  })
  communityId!: string;

  @OneToMany(() => Critter, (critter) => critter.species)
  @Field(() => [Critter], { nullable: false })
  @TypeormLoader()
  critters!: Critter[];

  @OneToMany(() => TraitList, (traitList) => traitList.species)
  @Field(() => [TraitList], { nullable: false })
  @TypeormLoader()
  traitLists!: TraitList[];
}
