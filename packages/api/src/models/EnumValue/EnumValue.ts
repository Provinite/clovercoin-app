import { Field, Int, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany } from "typeorm/index.js";
import { EnumValueSetting } from "../EnumValueSetting/EnumValueSetting.js";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";
import { Trait } from "../Trait/Trait.js";

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

  @Field(() => [EnumValueSetting])
  @OneToMany(
    () => EnumValueSetting,
    (enumValueSetting) => enumValueSetting.enumValueId
  )
  @TypeormLoader()
  enumValueSettings!: EnumValueSetting[];

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
