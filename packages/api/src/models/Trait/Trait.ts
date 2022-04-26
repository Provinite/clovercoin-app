import { Field, ObjectType } from "type-graphql";
import { Column, Entity, Unique } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import { IdField, ManyToOneField } from "../relationFieldDecorators";
import { Species } from "../Species/Species";

@Entity()
@ObjectType()
@Unique(["id", "speciesId"])
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

  @ManyToOneField({
    columnName: "speciesId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Species,
  })
  species!: Species;

  @Column("uuid", { nullable: false })
  speciesId!: string;
}
