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

@Entity()
@ObjectType()
@Unique(["traitListId", "enumValueId"])
export class EnumValueSetting {
  @IdField
  id!: string;

  @Field(() => [SpeciesVariant])
  @ManyToOne(() => SpeciesVariant, (traitList) => traitList.enumValueSettings, {
    nullable: false,
  })
  @JoinColumn({
    name: "traitListId",
    referencedColumnName: "id",
  })
  @TypeormLoader()
  traitList!: Relation<SpeciesVariant>;

  @ManyToOneField({
    columnName: "enumValueId",
    foreignColumnName: "id",
    type: () => EnumValue,
    nullable: false,
  })
  enumValue!: EnumValue;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  enumValueId!: string;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  traitListId!: string;
}
