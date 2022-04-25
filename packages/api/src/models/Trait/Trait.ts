import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import { IdField } from "../relationFieldDecorators";

@Entity()
@ObjectType()
export class Trait {
  @IdField
  id!: string;

  @Field(() => String)
  @Column({ nullable: false })
  name!: string;

  @Field(() => CritterTraitValueTypes)
  @Column({
    type: "enum",
    enum: CritterTraitValueTypes,
    nullable: false,
  })
  valueType!: CritterTraitValueTypes;
}
