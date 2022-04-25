import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators";
import { Trait } from "../Trait/Trait";
import { TraitList } from "../TraitList/TraitList";

@Entity()
@ObjectType()
export class TraitListEntry {
  @IdField
  id!: string;

  @ManyToOneField({
    columnName: "traitId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Trait,
  })
  trait!: Trait;

  @RelationIdField<TraitListEntry>({
    nullable: false,
    relation: (tle) => tle.trait,
  })
  traitId!: string;

  @ManyToOneField({
    columnName: "traitListId",
    foreignColumnName: "id",
    nullable: false,
    type: () => TraitList,
  })
  traitList!: TraitList;

  @RelationIdField<TraitListEntry>({
    nullable: false,
    relation: (tle) => tle.trait,
  })
  traitListId!: string;

  @Column({
    type: "smallint",
  })
  @Field(() => Int)
  order!: number;

  @Column()
  @Field(() => Boolean)
  required!: boolean;

  @Column({
    type: "enum",
    enum: CritterTraitValueTypes,
    nullable: false,
  })
  @Field(() => CritterTraitValueTypes)
  valueType!: CritterTraitValueTypes;

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

  @Column({ type: "varchar", nullable: true })
  defaultValueString: string | null = null;

  @Column("integer", { nullable: true })
  defaultValueInt: number | null = null;

  @Column("timestamptz", { nullable: true })
  defaultValueTimestamp: Date | null = null;
}
