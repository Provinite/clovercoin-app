import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import { Species } from "../Species/Species";

@Entity()
@ObjectType()
export class Trait {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ nullable: false })
  name: string = "";

  @Field(() => CritterTraitValueTypes)
  @Column({
    type: "enum",
    enum: CritterTraitValueTypes,
    nullable: false,
  })
  valueType!: CritterTraitValueTypes;

  @ManyToMany(() => Species, (species) => species.traits)
  species: Species[] | null = null;
}
