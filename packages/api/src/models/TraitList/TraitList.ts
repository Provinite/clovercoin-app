import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators";
import { Species } from "../Species/Species";

@Entity()
@ObjectType()
export class TraitList {
  @IdField
  id!: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  @Field(() => String)
  name!: string;

  @ManyToOneField({
    columnName: "speciesId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Species,
  })
  species!: Species;

  @RelationIdField<TraitList>({
    nullable: false,
    relation: (list) => list.species,
  })
  speciesId!: string;
}
