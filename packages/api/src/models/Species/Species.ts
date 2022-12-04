import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany } from "typeorm";
import { Community } from "../Community/Community";
import { Critter } from "../Critter/Critter";
import { IdField, ManyToOneField } from "../relationFieldDecorators";
import { TraitList } from "../TraitList/TraitList";

@Entity()
@ObjectType({
  description:
    "Model representing an arbitrarily broad class of characters that use common trait lists and administration.",
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

  @Column("uuid", { nullable: false })
  @Field(() => ID, {
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

  @Field(() => String, { description: "Icon URL for this species" })
  iconUrl: string = "https://placekitten.com/200/200";
}
