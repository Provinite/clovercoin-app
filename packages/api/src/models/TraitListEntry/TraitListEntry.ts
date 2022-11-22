import { Field, ID, Int, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import { IdField, ManyToOneField } from "../relationFieldDecorators";
import { Trait } from "../Trait/Trait";
import { TraitList } from "../TraitList/TraitList";

/**
 * Model representing a single entry on a trait list.
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
  trait!: Trait;

  /**
   * The trait list for this entry
   */
  @ManyToOneField({
    nullable: false,
    type: () => TraitList,
    columnName: "traitListId",
    foreignColumnName: "id",
  })
  traitList!: TraitList;

  /**
   * The ID of the trait for this entry
   */
  @Column("uuid", { nullable: false })
  @Field(() => ID)
  traitId!: string;

  /**
   * ID of the trait list for this entry
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
   * True if the field is required on a critter using this trait list
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
  valueType!: CritterTraitValueTypes;

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
