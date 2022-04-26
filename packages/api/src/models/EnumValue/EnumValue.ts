import { Field, ObjectType } from "type-graphql";
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

  @ManyToOneField({
    columnName: "traitId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Trait,
  })
  trait!: Trait;

  @RelationIdField<EnumValue>({
    nullable: false,
    relation: (ev) => ev.trait,
  })
  traitId!: string;

  @Column({ type: "varchar", nullable: false })
  @Field(() => String)
  name!: string;
}
