import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm/index.js";
import { IdField } from "../relationFieldDecorators.js";

@Entity()
@ObjectType()
export class Community {
  @IdField
  id!: string;

  @Field(() => String)
  @Column({ nullable: false, unique: true })
  name!: string;
}
