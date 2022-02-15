import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Critter } from "../Critter/Critter";
import { Trait } from "../Trait/Trait";

@Entity()
@ObjectType()
export class Species {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ nullable: false, unique: true })
  name: string = "";

  @OneToMany(() => Critter, (critter) => critter.species)
  critters: Critter[] | null = null;

  @ManyToMany(() => Trait, (trait) => trait.species)
  @JoinTable({
    name: "species_trait",
    joinColumn: {
      name: "speciesId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "traitId",
      referencedColumnName: "id",
    },
  })
  @TypeormLoader()
  @Field(() => [Trait])
  traits: Trait[] | null = null;
}
