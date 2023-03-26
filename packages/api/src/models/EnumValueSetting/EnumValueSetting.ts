import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { EnumValue } from "../EnumValue/EnumValue";
import { IdField, ManyToOneField } from "../relationFieldDecorators";
import { TraitList } from "../TraitList/TraitList";

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
  traitList!: TraitList;

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
