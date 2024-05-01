import {
  IsEmpty,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany } from "typeorm";
import { EnumValueSetting } from "../EnumValueSetting/EnumValueSetting.js";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";
import { Trait } from "../Trait/Trait.js";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

@Entity()
@ObjectType()
export class EnumValue {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
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
  @IsUUID(4, { groups: [...ValidationGroupAll] })
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
  @IsString({ groups: [...ValidationGroupAll] })
  @MinLength(1, { groups: [...ValidationGroupAll] })
  name!: string;

  @Column({
    type: "int",
    nullable: false,
  })
  @Field(() => Int)
  @IsInt({ groups: [...ValidationGroupAll] })
  @Min(0, { groups: [...ValidationGroupAll] })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { groups: [...ValidationGroupAll] }
  )
  order!: number;
}
