import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { IdField, ManyToOneField } from "../relationFieldDecorators";
import { Species } from "../Species/Species";

/**
 * Model representing a specific configuration, selection, and order
 * of traits.
 */
@Entity()
@ObjectType()
export class TraitList {
  @IdField
  id!: string;

  @ManyToOneField({
    columnName: "speciesId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Species,
  })
  species!: Species;

  @Column({
    type: "varchar",
    nullable: false,
  })
  @Field(() => String)
  name!: string;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  speciesId!: string;
}
