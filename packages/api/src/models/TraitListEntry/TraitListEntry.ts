import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, type Relation } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";
import { Trait } from "../Trait/Trait.js";
import { Variant } from "../TraitList/TraitList.js";

/**
 * Model representing a single entry on a variant's trait list.
 */
@Entity()
@ObjectType()
export class TraitListEntry {
  @IdField
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
    nullable: false,
    type: () => Trait,
  })
  trait!: Relation<Trait>;

  /**
   * The variant for this entry
   */
  @ManyToOneField({
    nullable: false,
    type: () => Variant,
    columnName: "traitListId",
    foreignColumnName: "id",
  })
  traitList!: Relation<Variant>;

  /**
   * The ID of the trait for this entry
   */
  @Column("uuid", { nullable: false })
  @Field(() => ID)
  traitId!: string;

  /**
   * ID of the variant for this entry
   */
  @Column("uuid", { nullable: false })
  @Field(() => ID)
  traitListId!: string;

  /**
   * Order of this trait in the list
   */
  @Column({
    type: "smallint",
  })
  @Field(() => Int)
  order!: number;

  /**
   * True if the field is required on a critter using this variant
   */
  @Column()
  @Field(() => Boolean)
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
  valueType!: Relation<CritterTraitValueTypes>;

  /**
   * Default string value for the trait
   */
  @Column({ type: "varchar", nullable: true })
  defaultValueString: string | null = null;

  /**
   * Default int value for the trait
   */
  @Column("integer", { nullable: true })
  defaultValueInt: number | null = null;

  /**
   * Default timestamp value for the trait
   */
  @Column("timestamptz", { nullable: true })
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
