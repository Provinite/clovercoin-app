import { IsEmpty, IsEnum, IsString, IsUUID, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany, type Relation } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes.js";
import { EnumValue } from "../EnumValue/EnumValue.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";
import { Species } from "../Species/Species.js";
import { TraitListEntry } from "../TraitListEntry/TraitListEntry.js";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

@Entity()
@ObjectType()
export class Trait {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  @Field(() => String)
  @Column({ nullable: false })
  @IsString({
    groups: [...ValidationGroupAll],
  })
  @MinLength(1, {
    groups: [...ValidationGroupAll],
  })
  name!: string;

  @Field(() => CritterTraitValueTypes)
  @Column({
    type: "enum",
    enum: CritterTraitValueTypes,
    nullable: false,
  })
  @IsEnum(CritterTraitValueTypes, {
    groups: [...ValidationGroupAll],
  })
  valueType!: CritterTraitValueTypes;

  @OneToMany(() => TraitListEntry, (traitListEntry) => traitListEntry.trait)
  traitListEntries!: TraitListEntry[];

  @Field(() => [EnumValue])
  @OneToMany(() => EnumValue, (enumValue) => enumValue.trait)
  @TypeormLoader()
  enumValues!: EnumValue[];

  @Column("uuid", { nullable: false })
  @IsUUID(4, {
    groups: [...ValidationGroupAll],
  })
  speciesId!: string;

  @ManyToOneField({
    columnName: "speciesId",
    nullable: false,
    type: () => Species,
    foreignColumnName: "id",
  })
  species!: Relation<Species>;
}
