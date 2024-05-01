import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, type Relation } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";
import { Trait } from "../Trait/Trait.js";
import { SpeciesVariant } from "../SpeciesVariant/SpeciesVariant.js";
import {
  IsBoolean,
  IsDate,
  IsEmpty,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from "class-validator";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

/**
 * Model representing a single entry on a variant's trait list.
 */
@Entity()
@ObjectType()
export class TraitListEntry {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  /**
   * @TODO Add `valueType` constraint here.
   * This is blocked by setting up migrations properly. synchronize breaks if we
   * try to share enums between types.
   *
   * That's the real @TODO anyway
   */
  /**
   * The associated trait
   */
  @ManyToOneField<Trait, typeof Trait>({
    columnName: "traitId",
    foreignColumnName: "id",
    inverseSide: (trait) => trait.traitListEntries,
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_2f2b5a9ef8b2060e65a8ea8dc72",
    },
    nullable: false,
    type: () => Trait,
  })
  trait!: Relation<Trait>;

  /**
   * The variant for this entry
   */
  @ManyToOneField({
    nullable: false,
    type: () => SpeciesVariant,
    columnName: "speciesVariantId",
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_6a9e092e68655161d7934f3677f",
    },
  })
  speciesVariant!: Relation<SpeciesVariant>;

  /**
   * The ID of the trait for this entry
   */
  @Column("uuid", { nullable: false })
  @Field(() => ID)
  @IsUUID(4, {
    always: true,
  })
  traitId!: string;

  /**
   * ID of the variant for this entry
   */
  @Column("uuid", { nullable: false })
  @Field(() => ID)
  @IsUUID(4, {
    always: true,
  })
  speciesVariantId!: string;

  /**
   * Order of this trait in the list
   */
  @Column({
    type: "smallint",
  })
  @Field(() => Int)
  @IsInt({
    groups: [...ValidationGroupAll],
  })
  @Min(0, {
    groups: [...ValidationGroupAll],
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      groups: [...ValidationGroupAll],
    }
  )
  order!: number;

  /**
   * True if the field is required on a critter using this variant
   */
  @Column()
  @Field(() => Boolean)
  @IsBoolean({
    groups: [...ValidationGroupAll],
  })
  required!: boolean;

  /**
   * Value type of the underlying trait
   */
  @Column({
    type: "enum",
    enum: CritterTraitValueTypes,
    nullable: false,
  })
  @Field(() => CritterTraitValueTypes)
  @IsEnum(CritterTraitValueTypes, {
    groups: [...ValidationGroupAll],
  })
  valueType!: Relation<CritterTraitValueTypes>;

  /**
   * Default string value for the trait
   */
  @Column({ type: "varchar", nullable: true })
  @IsString({
    always: true,
  })
  @ValidateIf(isNotNull, {
    groups: [...ValidationGroupAll],
  })
  defaultValueString: string | null = null;

  /**
   * Default int value for the trait
   */
  @Column("integer", { nullable: true })
  @IsInt({
    groups: [...ValidationGroupAll],
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      groups: [...ValidationGroupAll],
    }
  )
  @ValidateIf(isNotNull, {
    groups: [...ValidationGroupAll],
  })
  defaultValueInt: number | null = null;

  /**
   * Default timestamp value for the trait
   */
  @Column("timestamptz", { nullable: true })
  @IsDate({
    groups: [...ValidationGroupAll],
  })
  @ValidateIf(isNotNull, {
    groups: [...ValidationGroupAll],
  })
  defaultValueTimestamp: Date | null = null;

  /**
   * Display value for the default value
   */
  @Field(() => String, { nullable: true })
  get defaultDisplayValue(): string {
    if (this.valueType === CritterTraitValueTypes.String) {
      return this.defaultValueString || "";
    } else if (this.valueType === CritterTraitValueTypes.Integer) {
      return this.defaultValueInt === null ? "" : String(this.defaultValueInt);
    } else if (this.valueType === CritterTraitValueTypes.Timestamp) {
      return this.defaultValueTimestamp
        ? this.defaultValueTimestamp.toDateString()
        : "";
    } else {
      return "";
    }
  }
}

function isNotNull(_obj: unknown, value: any) {
  return value !== null;
}
