import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import { IdField, ManyToOneField } from "../relationFieldDecorators";
import { Species } from "../Species/Species";
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
  @ManyToOneField({
    joinColumnOptions: [
      {
        name: "traitId",
        referencedColumnName: "id",
      },
      {
        name: "speciesId",
        referencedColumnName: "speciesId",
      },
    ],
    nullable: false,
    type: () => Trait,
  })
  trait!: Trait;

  /**
   * The species that owns the associated trait list
   */
  @ManyToOneField({
    columnName: "speciesId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Species,
  })
  species!: Species;

  /**
   * The trait list for this entry
   */
  @ManyToOneField({
    joinColumnOptions: [
      { name: "traitListId", referencedColumnName: "id" },
      { name: "speciesId", referencedColumnName: "speciesId" },
    ],
    nullable: false,
    type: () => TraitList,
  })
  traitList!: TraitList;

  /**
   * The ID of the trait for this entry
   */
  @Column("uuid", { nullable: false })
  @Field(() => ID)
  traitId!: string;

  /**
   * The ID of the species associated w/ this entry's list
   */
  @Column("uuid", { nullable: false })
  @Field(() => ID)
  speciesId!: string;

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
