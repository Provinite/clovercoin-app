import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Species } from "../Species/Species";
import { TypeormLoader } from "type-graphql-dataloader";
import { CritterTrait } from "../CritterTrait/CritterTrait";
import { CritterTraitUnionType } from "../CritterTrait/CritterTraitUnionType";

@Entity()
@ObjectType()
export class Critter {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  name: string = "";

  @Field(() => ID, { nullable: false })
  @RelationId((critter: Critter) => critter.species)
  @Column()
  speciesId!: string;

  @ManyToOne(() => Species, (species) => species.critters, { nullable: false })
  @Field(() => Species, { nullable: false })
  @TypeormLoader()
  species: Species | null = null;

  @OneToMany(() => CritterTrait, (critterTrait) => critterTrait.critter)
  @Field(() => [CritterTraitUnionType], { nullable: false })
  @TypeormLoader()
  traits: CritterTrait[] | null = null;
}

export type CritterRequiredFieldKeys = "speciesId";
export interface CritterRequiredFields
  extends Pick<Critter, CritterRequiredFieldKeys> {}
