import { IsEmpty, IsString, IsUUID, MinLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany, type Relation } from "typeorm";
import { Critter } from "../Critter/Critter.js";
import { EnumValueSetting } from "../EnumValueSetting/EnumValueSetting.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";
import { Species } from "../Species/Species.js";
import { TraitListEntry } from "../TraitListEntry/TraitListEntry.js";
import { ValidationGroup } from "../ValidationGroup.js";

/**
 * Model representing a specific configuration, selection, and order
 * of traits.
 */
@Entity()
@ObjectType()
export class SpeciesVariant {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  @ManyToOneField({
    columnName: "speciesId",
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_966982509647dc386b75ee2d143",
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
  @IsString({
    always: true,
  })
  @MinLength(1, {
    always: true,
  })
  name!: string;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  @IsUUID(4, {
    always: true,
  })
  speciesId!: string;

  @OneToMany(
    () => TraitListEntry,
    (traitListEntry) => traitListEntry.speciesVariant
  )
  @Field(() => [TraitListEntry])
  @TypeormLoader()
  traitListEntries!: TraitListEntry[];

  @OneToMany(
    () => EnumValueSetting,
    (enumValueSetting) => enumValueSetting.speciesVariant
  )
  @Field(() => [EnumValueSetting])
  @TypeormLoader()
  enumValueSettings!: EnumValueSetting[];

  @OneToMany(() => Critter, (critter) => critter.variant)
  critters!: Critter[];
}
