import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany } from "typeorm";
import { Community } from "../Community/Community.js";
import { Critter } from "../Critter/Critter.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";
import { SpeciesVariant } from "../SpeciesVariant/SpeciesVariant.js";

@Entity()
@ObjectType({
  description:
    "Model representing an arbitrarily broad class of characters that use common variants and administration.",
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

  @OneToMany(() => SpeciesVariant, (speciesVariant) => speciesVariant.species)
  @Field(() => [SpeciesVariant], { nullable: false })
  @TypeormLoader()
  variants!: SpeciesVariant[];

  @Field(() => String, {})
  @Column("boolean", { nullable: false, default: false })
  hasImage: boolean = false;
}
