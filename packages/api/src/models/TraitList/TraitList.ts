import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { EnumValueSetting } from "../EnumValueSetting/EnumValueSetting";
import { IdField, ManyToOneField } from "../relationFieldDecorators";
import { Species } from "../Species/Species";
import { TraitListEntry } from "../TraitListEntry/TraitListEntry";

/**
 * Model representing a specific configuration, selection, and order
 * of traits.
 */
@Entity()
@ObjectType()
@Unique(["id", "speciesId"])
export class TraitList {
  @IdField
  id!: string;

  @ManyToOneField({
    columnName: "speciesId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Species,
  })
  species!: Species;

  @Column({
    type: "varchar",
    nullable: false,
  })
  @Field(() => String)
  name!: string;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  speciesId!: string;

  @OneToMany(() => TraitListEntry, (traitListEntry) => traitListEntry.traitList)
  @Field(() => [TraitListEntry])
  @TypeormLoader()
  traitListEntries!: TraitListEntry[];

  @OneToMany(
    () => EnumValueSetting,
    (enumValueSetting) => enumValueSetting.traitList
  )
  @Field(() => [EnumValueSetting])
  @TypeormLoader()
  enumValueSettings!: EnumValueSetting[];
}
