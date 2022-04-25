import { Field, ID, InterfaceType, registerEnumType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Critter } from "../Critter/Critter";
import { Trait } from "../Trait/Trait";
import { CritterTraitValueTypes } from "./CritterTraitValueTypes";

registerEnumType(CritterTraitValueTypes, {
  name: "CritterTraitValueType",
});

export interface CritterTraitRequiredCreate {
  valueType: CritterTraitValueTypes;
}

@Entity()
@InterfaceType({})
export class CritterTrait {
  @Field(() => ID, { nullable: false })
  @PrimaryGeneratedColumn("uuid")
  id: string | null = null;

  @RelationId((critterTrait: CritterTrait) => critterTrait.critter)
  @Field(() => ID, { nullable: false })
  @Column()
  critterId!: string;

  @ManyToOne(() => Critter, (critter) => critter.traits)
  critter: Critter | null = null;

  @RelationId((critterTrait: CritterTrait) => critterTrait.trait)
  @Field(() => ID, { nullable: false })
  @Column()
  traitId!: string;

  @ManyToOne(() => Trait, { nullable: false })
  @Field(() => Trait)
  @TypeormLoader()
  trait: Trait | null = null;

  @Column({
    type: "enum",
    enum: CritterTraitValueTypes,
    nullable: false,
  })
  @Field(() => CritterTraitValueTypes)
  valueType!: CritterTraitValueTypes;

  @Field(() => String, { nullable: true })
  get displayValue(): string {
    if (this.valueType === CritterTraitValueTypes.String) {
      return this.valueString || "";
    } else if (this.valueType === CritterTraitValueTypes.Integer) {
      return this.valueInt === null ? "" : String(this.valueInt);
    } else if (this.valueType === CritterTraitValueTypes.Timestamp) {
      return this.valueTimestamp ? this.valueTimestamp.toDateString() : "";
    } else if (this.valueType === CritterTraitValueTypes.Enum) {
      return "[Enum Value]";
    } else {
      return "";
    }
  }

  @Column({ type: "varchar", nullable: true })
  valueString: string | null = null;

  @Column("integer", { nullable: true })
  valueInt: number | null = null;

  @Column("timestamptz", { nullable: true })
  valueTimestamp: Date | null = null;
}
