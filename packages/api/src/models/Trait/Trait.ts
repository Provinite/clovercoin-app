import { Field, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany } from "typeorm";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";
import { EnumValue } from "../EnumValue/EnumValue";
import { IdField, ManyToOneField } from "../relationFieldDecorators";
import { Species } from "../Species/Species";
import { TraitListEntry } from "../TraitListEntry/TraitListEntry";

@Entity()
@ObjectType()
export class Trait {
  @IdField
  id!: string;

  @Field(() => String)
  @Column({ nullable: false })
  name!: string;

  @Field(() => CritterTraitValueTypes)
  @Column({
    type: "enum",
    enum: CritterTraitValueTypes,
    nullable: false,
  })
  valueType!: CritterTraitValueTypes;

  @OneToMany(() => TraitListEntry, (traitListEntry) => traitListEntry.trait)
  traitListEntries!: TraitListEntry[];

  @Field(() => [EnumValue])
  @OneToMany(() => EnumValue, (enumValue) => enumValue.trait)
  @TypeormLoader()
  enumValues!: EnumValue[];

  @Column("uuid", { nullable: false })
  speciesId!: string;

  @ManyToOneField({
    columnName: "speciesId",
    nullable: false,
    type: () => Species,
    foreignColumnName: "id",
  })
  species!: Species;
}
