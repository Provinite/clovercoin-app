import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { EnumValue } from "../EnumValue/EnumValue";
import { IdField, ManyToOneField } from "../relationFieldDecorators";
import { TraitList } from "../TraitList/TraitList";

@Entity()
@ObjectType()
export class EnumValueSetting {
  @IdField
  id!: string;

  @ManyToOneField({
    columnName: "traitListId",
    foreignColumnName: "id",
    type: () => TraitList,
    nullable: false,
  })
  traitList!: TraitList;

  @ManyToOneField({
    columnName: "enumValueId",
    foreignColumnName: "id",
    type: () => EnumValue,
    nullable: false,
  })
  enumValue!: EnumValue;

  @Column("boolean", { nullable: false })
  @Field(() => Boolean)
  allowed!: boolean;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  enumValueId!: string;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  traitListId!: string;
}
