import { IsEmpty, IsUUID } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  type Relation,
  Unique,
} from "typeorm";
import { EnumValue } from "../EnumValue/EnumValue.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";
import { SpeciesVariant } from "../SpeciesVariant/SpeciesVariant.js";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

@Entity()
@ObjectType()
@Unique("UQ_3560cef16c43083407f0b7a4cd4", ["speciesVariantId", "enumValueId"])
export class EnumValueSetting {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  @Field(() => [SpeciesVariant])
  @ManyToOne(
    () => SpeciesVariant,
    (speciesVariant) => speciesVariant.enumValueSettings,
    {
      nullable: false,
    }
  )
  @JoinColumn({
    name: "speciesVariantId",
    referencedColumnName: "id",
    foreignKeyConstraintName: "FK_d29d07896675d1ab7aa2c1a3b1e",
  })
  @TypeormLoader()
  speciesVariant!: Relation<SpeciesVariant>;

  @ManyToOneField({
    columnName: "enumValueId",
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_39c63c3bf1ca4d492cc8d2d2e78",
    },
    type: () => EnumValue,
    nullable: false,
  })
  enumValue!: EnumValue;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  @IsUUID(4, { groups: [...ValidationGroupAll] })
  enumValueId!: string;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  @IsUUID(4, { groups: [...ValidationGroupAll] })
  speciesVariantId!: string;
}
