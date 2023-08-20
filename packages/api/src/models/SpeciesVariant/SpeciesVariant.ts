import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany, type Relation } from "typeorm";
import { Critter } from "../Critter/Critter.js";
import { EnumValueSetting } from "../EnumValueSetting/EnumValueSetting.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";
import { Species } from "../Species/Species.js";
import { TraitListEntry } from "../TraitListEntry/TraitListEntry.js";

/**
 * Model representing a specific configuration, selection, and order
 * of traits.
 */
@Entity()
@ObjectType()
export class SpeciesVariant {
  @IdField
  id!: string;

  @ManyToOneField({
    columnName: "speciesId",
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_7763bfcc4cea7dd7d063e1ccca2",
    },
    nullable: false,
    type: () => Species,
  })
  species!: Relation<Species>;

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

  @OneToMany(() => Critter, (critter) => critter.traitList)
  critters!: Critter[];
}
