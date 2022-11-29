import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators";
import { Trait } from "../Trait/Trait";

@Entity()
@ObjectType()
export class EnumValue {
  @IdField
  id!: string;

  @ManyToOneField<Trait>({
    columnName: "traitId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Trait,
    inverseSide: (trait) => trait.enumValues,
  })
  trait!: Trait;

  @RelationIdField<EnumValue>({
    nullable: false,
    relation: (ev) => ev.trait,
  })
  @Column()
  traitId!: string;

  @Column({ type: "varchar", nullable: false })
  @Field(() => String)
  name!: string;

  @Column({
    type: "int",
    nullable: false,
  })
  @Field(() => Int)
  order!: number;
}
