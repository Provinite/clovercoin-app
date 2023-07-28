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
import { TraitList } from "../TraitList/TraitList.js";

@Entity()
@ObjectType()
@Unique(["traitListId", "enumValueId"])
export class EnumValueSetting {
  @IdField
  id!: string;

  @Field(() => [TraitList])
  @ManyToOne(() => TraitList, (traitList) => traitList.enumValueSettings, {
    nullable: false,
  })
  @JoinColumn({
    name: "traitListId",
    referencedColumnName: "id",
  })
  @TypeormLoader()
  traitList!: Relation<TraitList>;

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
