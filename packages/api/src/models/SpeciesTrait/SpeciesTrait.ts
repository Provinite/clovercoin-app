import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from "typeorm";
import { Species } from "../Species/Species";
import { Trait } from "../Trait/Trait";

@Entity()
@ObjectType()
export class SpeciesTrait {
  @Field(() => ID)
  @Generated("uuid")
  id!: string;

  @ManyToOne(() => Species, { nullable: false })
  species: Species | null = null;

  @RelationId((st: SpeciesTrait) => st.species)
  @Column()
  @Field(() => ID, { nullable: false })
  @PrimaryColumn()
  speciesId!: string;

  @ManyToOne(() => Trait, { nullable: false })
  trait: Trait | null = null;

  @RelationId((st: SpeciesTrait) => st.trait)
  @Field(() => ID, { nullable: false })
  @Column()
  @PrimaryColumn()
  traitId!: string;
}
